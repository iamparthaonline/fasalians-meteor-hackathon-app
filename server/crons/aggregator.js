const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');
import {sources, contents} from '../collections';

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

if (Meteor.isServer) {
  SyncedCron.config({
    collectionName: 'content_crawl_cron_history',
  });

  SyncedCron.add({
    name: 'Crwaling the Latest News Available',
    schedule: parser => {
      return parser.text('every 3 hours');
    },
    job: async intendedAt => {
      console.log(`Content Crawling Cron intended at - ${intendedAt}, Running at - ${new Date()}`);
      initiateNewsCrawler();
    },
  });

  Meteor.startup(function () {
    SyncedCron.start();
  });

  let browser, page;
  async function initializeBrowser() {
    const puppeteerAgent = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
      executablePath: await chrome.executablePath,
      headless: true,
    });
    page = await browser.newPage();
    page.setUserAgent(puppeteerAgent);
    await page.setRequestInterception(true);
    console.log('browser');
    page.on('request', req => {
      if (
        req.resourceType() == 'font' ||
        req.resourceType() == 'image' ||
        req.resourceType() == 'script' ||
        req.resourceType() == 'stylesheet'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }

  async function crawlNews() {
    try {
      let portals = sources.find({}).fetch();
      console.log('portals', portals);

      for (let j = 0; j < portals.length; j++) {
        if (portals[j]) {
          let {link, newsLinkQuery, _id, name, sourceId} = portals[j];
          console.log(`Fetching News from - ${name}\n`);
          await page.goto(link, {
            waitUntil: 'load',
            timeout: 0,
          });

          let postIds = await page.evaluate(getPostList, {
            newsLinkQuery,
          });
          console.log(`Fetched ${postIds.length} news!\n`);
          for (let i = 0; i < postIds.length; i++) {
            console.log('\n', i, '. ', postIds[i].href, '\n');

            if (postIds[i] && postIds[i].href && isValidHttpUrl(postIds[i].href)) {
              let doesExist = contents.findOne({
                contentUrl: postIds[i].href,
              });
              if (!doesExist) {
                console.log(`Fetching details for - ${postIds[i].href}`);
                try {
                  let data = await getPost(postIds[i].href);
                  const contentData = {
                    contentImage: data.images?.[0],
                    contentTitle: data.title,
                    contentDescription: data.description,
                    contentUrl: postIds[i].href,
                    sourceId,
                    isModerated: false,
                    topics: [],
                    isApproved: false,
                    createdOn: new Date(),
                  };
                  // need to do topic model here and add topics
                  contents.insert(contentData);
                } catch (e) {
                  console.log('error', e);
                }
              } else {
                console.log('already exists in db');
              }
            }
          }
        }
      }
      await browser.close();
    } catch (e) {
      await browser.close();
    }
  }
  const getPostList = ({newsLinkQuery}) => {
    const extractedElements = document.querySelectorAll(newsLinkQuery || 'a');
    const items = [];
    for (let element of extractedElements) {
      let {href} = element;
      items.push({
        href,
      });
    }
    return items;
  };

  async function getPost(url) {
    await page.goto(url, {
      waitUntil: ['load', 'domcontentloaded'],
      timeout: 0,
    });
    let title = await getTitle(page);
    let description = await getDescription(page);
    let images = await getImg(page, url);
    return {
      title,
      description,
      images,
    };
    // need news posted date
    // need image validation
  }

  const getTitle = async page => {
    const title = await page.evaluate(() => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle != null && ogTitle.content.length > 0) {
        return ogTitle.content;
      }
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle != null && twitterTitle.content.length > 0) {
        return twitterTitle.content;
      }
      const docTitle = document.title;
      if (docTitle != null && docTitle.length > 0) {
        return docTitle;
      }
      const h1 = document.querySelector('h1');
      if (h1 != null && h1.length > 0) {
        return h1.innerHTML;
      }
      const h2 = document.querySelector('h2');
      if (h2 != null && h2.length > 0) {
        return h2.innerHTML;
      }
      return null;
    });
    return title;
  };

  const getDescription = async page => {
    const description = await page.evaluate(() => {
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription != null && ogDescription.content.length > 0) {
        return ogDescription.content;
      }
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription != null && twitterDescription.content.length > 0) {
        return twitterDescription.content;
      }
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription != null && metaDescription.content.length > 0) {
        return metaDescription.content;
      }
      paragraphs = document.querySelectorAll('p');
      let fstVisibleParagraph = null;
      for (let i = 0; i < paragraphs.length; i++) {
        if (
          // if object is visible in dom
          paragraphs[i].offsetParent !== null &&
          !paragraphs[i].childElementCount != 0
        ) {
          fstVisibleParagraph = paragraphs[i].textContent;
          break;
        }
      }
      return fstVisibleParagraph;
    });
    return description;
  };

  const getImg = async (page, uri) => {
    const images = await page.evaluate(() => {
      let contentImages = [];
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg != null && ogImg.content.length > 0) {
        contentImages.push(ogImg.content);
      }
      const imgRelLink = document.querySelector('link[rel="image_src"]');
      if (imgRelLink != null && imgRelLink.href.length > 0) {
        contentImages.indexOf(imgRelLink.href) === -1 && contentImages.push(imgRelLink.href);
      }
      const twitterImg = document.querySelector('meta[name="twitter:image"]');
      if (twitterImg != null && twitterImg.content.length > 0) {
        contentImages.indexOf(twitterImg.content) === -1 && contentImages.push(twitterImg.content);
      }

      let imgs = Array.from(document.getElementsByTagName('img'));
      if (imgs.length > 0) {
        imgs = imgs.filter(img => {
          let addImg = true;
          if (img.naturalWidth > img.naturalHeight) {
            if (img.naturalWidth / img.naturalHeight > 3) {
              addImg = false;
            }
          } else {
            if (img.naturalHeight / img.naturalWidth > 3) {
              addImg = false;
            }
          }
          if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
            addImg = false;
          }
          return addImg;
        });
        imgs.forEach(img =>
          contentImages.push(
            img.src.indexOf('//') === -1 ? (img.src = `${window.location.origin}/${img.src}`) : img.src,
          ),
        );
      }
      return contentImages;
    });
    return images;
  };

  async function initiateNewsCrawler() {
    await initializeBrowser();
    await crawlNews();
  }
}
