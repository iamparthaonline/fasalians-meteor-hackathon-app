<template>
  <div class="main-div">
    <TopNavBar :is-back-button="true" title="Create Today's Digest" />
    <div v-if="showModal" class="modal">
      <div class="modal-section">
        <img class="close-img" src="/close.png" alt="" @click="closeModal" />
        <div v-if="showContent === 'national'">
          <DigestFormCard
            v-for="cardData in result"
            :key="cardData._id._str"
            :card-data="cardData"
            :is-selected="isCardSelected(selectedNational, cardData._id)"
            @clicked="saveCard(selectedNational, cardData._id)"
          />
        </div>
        <div v-if="showContent === 'international'">
          <DigestFormCard
            v-for="cardData in result"
            :key="cardData._id._str"
            :card-data="cardData"
            :is-selected="isCardSelected(selectedInternational, cardData._id)"
            @clicked="saveCard(selectedInternational, cardData._id)"
          />
        </div>
        <div v-if="showContent === 'miscellaneous'">
          <DigestFormCard
            v-for="cardData in result"
            :key="cardData._id._str"
            :card-data="cardData"
            :is-selected="isCardSelected(selectedMiscellaneous, cardData._id)"
            @clicked="saveCard(selectedMiscellaneous, cardData._id)"
          />
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="section">
        <h3 class="title">{{ getFormattedDate(new Date()) }}</h3>
        <h3 class="title">Title</h3>
        <textarea id="title" v-model="title" class="text-area" name="title" cols="30" rows="3"></textarea>
      </div>
      <div class="divider"></div>
      <div class="section">
        <div class="section-heading">
          <h3>National</h3>
          <button class="select-btn" @click="loadContent('national')">Select Content +</button>
        </div>
        <div v-if="selectedNational.length === 0">
          <h5 class="low-opacity-text">No Content Selected</h5>
        </div>
        <div v-else>
          <h3>{{ selectedNational.length }} Content Selected</h3>
          <div
            v-for="cardData in result"
            v-if="isCardSelected(selectedNational, cardData._id)"
            :key="cardData._id._str"
            class="cards-div"
          >
            <img
              class="cross-img"
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              alt=""
              @click="closeCard(selectedNational, cardData._id)"
            />
            <DigestFormCard :card-data="cardData" :is-selected="isCardSelected(selectedNational, cardData._id)" />
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="section">
        <div class="section-heading">
          <h3>International</h3>
          <button class="select-btn" @click="loadContent('international')">Select Content +</button>
        </div>
        <div v-if="selectedInternational.length === 0">
          <h5 class="low-opacity-text">No Content Selected</h5>
        </div>
        <div v-else>
          <h3>{{ selectedInternational.length }} Content Selected</h3>
          <div
            v-for="cardData in result"
            v-if="isCardSelected(selectedInternational, cardData._id)"
            :key="cardData._id._str"
            class="cards-div"
          >
            <img
              class="cross-img"
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              alt=""
              @click="closeCard(selectedInternational, cardData._id)"
            />
            <DigestFormCard :card-data="cardData" :is-selected="isCardSelected(selectedInternational, cardData._id)" />
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="section">
        <div class="section-heading">
          <h3 class="section-heading">Miscellaneous</h3>

          <button class="select-btn" @click="loadContent('miscellaneous')">Select Content +</button>
        </div>
        <div v-if="selectedMiscellaneous.length === 0">
          <h5 class="low-opacity-text">No Content Selected</h5>
        </div>
        <div v-else>
          <h3>{{ selectedMiscellaneous.length }} Content Selected</h3>
          <div
            v-for="cardData in result"
            v-if="isCardSelected(selectedMiscellaneous, cardData._id)"
            :key="cardData._id._str"
            class="cards-div"
          >
            <img
              class="cross-img"
              src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
              alt=""
              @click="closeCard(selectedMiscellaneous, cardData._id)"
            />
            <DigestFormCard :card-data="cardData" :is-selected="isCardSelected(selectedMiscellaneous, cardData._id)" />
          </div>
        </div>
      </div>
      <div class="divider"></div>

      <div class="section last-section">
        <h3 class="title">Editor's Note</h3>
        <textarea id="note" v-model="editor" class="text-area" name="note" cols="30" rows="3"></textarea>
      </div>
      <div class="save-btn-div">
        <button class="save-btn" @click="saveForm">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  import DigestFormCard from '../../components/digestFormCard.vue';
  import TopNavBar from '../../components/topNavBar.vue';
  import {DateTime} from 'luxon';

  export default {
    components: {
      DigestFormCard,
      TopNavBar,
    },
    data() {
      return {
        result: [],
        title: '',
        selectedNational: [],
        selectedInternational: [],
        selectedMiscellaneous: [],
        showContent: '',
        editor: '',
        showModal: false,
      };
    },
    mounted() {
      Meteor.call('getAllContents', (err, response) => {
        this.result = response;
      });
    },
    methods: {
      loadContent(name) {
        this.showModal = true;
        this.showContent = name;
      },
      isCardSelected(array, id) {
        return array.includes(id);
      },
      saveCard(array, id) {
        const index = array.indexOf(id);
        if (index > -1) {
          array.splice(index, 1);
        } else {
          array.push(id);
        }
      },
      saveForm() {
        const todaysDate = DateTime.fromJSDate(new Date()).setLocale('en-IN').toFormat('dd LLLL yyyy');
        Meteor.call(
          'saveDigestForm',
          this.title,
          this.selectedNational,
          this.selectedInternational,
          this.selectedMiscellaneous,
          this.editor,
          todaysDate,
          (err, response) => {
            console.log(err, response);
          },
        );
        this.$router.push('/dashboard');
      },
      closeModal() {
        this.showModal = false;
      },
      closeCard(array, id) {
        const index = array.indexOf(id);
        if (index > -1) {
          array.splice(index, 1);
        }
      },
    },
  };
</script>

<style scoped>
  .main-div {
    min-height: 100vh;
    background-color: white;
    position: relative;
    padding: 0 15px;
  }
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    background-color: gray;
  }
  .modal-section {
    margin-top: 10px;
    height: 95%;
    width: 95%;
    overflow: auto;
    background-color: white;
    padding: 10px;
  }
  .close-img {
    cursor: pointer;
    z-index: 5;
    position: fixed;
    right: 50px;
    height: 20px;
    width: 20px;
  }
  .section {
    padding: 10px 0;
  }
  .divider {
    margin: 10px auto;
    opacity: 0.5;
    width: 50%;
    height: 2px;
    background-color: #c9ccd5;
  }
  .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .section-heading > h3,
  .title {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .title {
    text-align: center;
    margin-top: 10px;
  }
  .low-opacity-text {
    opacity: 0.4;
    font-size: 16px;
  }
  .save-btn-div {
    position: absolute;
    width: calc(100% - 30px);
    bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .text-area {
    width: 100%;
    border: 1px solid #393e46;
    outline: none;
  }
  .container {
    padding-bottom: 70px;
  }
  .cards-div {
    position: relative;
  }
  .cross-img {
    position: absolute;
    height: 20px;
    width: 20px;
    right: 10px;
    top: 10px;
    z-index: 5;
  }
  .save-btn {
    width: fit-content;
    border: none;
    outline: none;
    background-color: #1b262c;
    color: #fff;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    padding: 10px 25px;
    text-align: center;
  }

  .select-btn {
    width: fit-content;
    height: 25px;
    border: none;
    outline: none;
    background-color: #eeeeee;
    color: black;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    text-align: center;
  }
</style>
