<template>
  <div>
    <div class="header">
      <v-icon v-if="cardData.stepNumber < 3" class="mr-2" medium @click="backClickHandler">mdi-keyboard-backspace</v-icon>
      <span >Report Analysis</span>
    </div>
    <div class="main-card-div">
      <div class="step-heading-div">
        <h2 class="step">Step {{ cardData.stepNumber }}:</h2>
        <h3 :class="{'text-center': cardData.stepNumber === 5}" class="selection-heading">{{ cardData.heading }}</h3>
      </div>
      <div v-if="cardData.stepNumber === 1" class="crop-images-div">
        <div
          v-for="(crop, index) in cardData.crops"
          :key="index"
          :class="{selected: crop === selected.crop}"
          class="card-details"
          @click="selectCrop(crop)"
        >
          <img :src="`./crop-icons/${crop}.png`" alt="" />
          <p>
            <strong>{{ formatText(crop) }}</strong>
          </p>
        </div>
      </div>
      <div v-if="cardData.stepNumber === 2">
         <p class="mb-5"> Select high quality image for better results.</p>
         <ImageUpload v-model="selected.image" />
      </div>

      <div v-if="cardData.stepNumber === 3" class="text-center">
        <img class="process-loading" src="/data-processing.gif">
        <p class="pa-3">Please wait, our machine learning algorithm is processing your image.</p>
      </div>
      <div v-if="cardData.stepNumber === 4" class="lottie-div">
        <div class="text-center m-10"><img style="margin-top: 50px !important" src="/check.png" /></div>
        <p class="info-para m-10" style="margin-top: 100px !important">
          Your plant health report is generated successfully.
        </p>
      </div>
      <div class="btn-div">
      <v-btn :loading="loading" :disabled="isDisabled" color="success" @click="clickHandler" block>Continue</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageUpload from '../../components/imageUpload.vue';

  export default {
    props: {
      cardData: {
        type: Object,
        default: () => {},
      },
    },
    components: {
      ImageUpload
    },
    data() {
      return {
        isDisabled: true,
        loading: false,
        selected: {crop: '', image: ''}
      };
    },
    watch: {
    selected(newVal, old) {
      if (newVal.image) {
        this.isDisabled = false;
      }
    }
  },
    methods: {
      formatText(string) {
        string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        return string.replace(/_/g, ' ');
      },
      selectCrop(cropName) {
        this.selected.crop = cropName;
        this.isDisabled = false;
      },
      clickHandler() {
        if (!this.isDisabled) {
          switch (this.cardData.stepNumber) {
            case 1:
              this.$emit('changeCard');
              
              break;
            case 2:
              this.$emit('generate-report', this.selected);
              this.loading = true;
              break;
            default:
              this.$emit('changeCard');
              break;
          }
          this.$emit('savedDetails', this.selected);
        }
      },
      backClickHandler() {
        console.log('this.cardData.stepNumber', this.cardData.stepNumber);
        if (this.cardData.stepNumber === 1) window.history.back();
        if (this.cardData.stepNumber === 2) {
          if (this.selected.crop) {
            this.isDisabled = false;
          }
        }
        this.$emit('showPrev');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .main-card-div {
    padding: 20px;
    position: relative;
    min-height: 100vh;
    background-color: white;
  }
  .disabled {
    background-color: #bbded6 !important;
  }
  .header {
    padding: 20px;
    display: flex;
    align-items: center;
      font-weight: bold;

  }
  .header-heading {
    color: white;
    font-weight: bold;
    margin: 0;
  }
  .back-img {
    cursor: pointer;
    height: 30px;
    width: 30px;
  }
  .title {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .step {
    font-size: 16px;
  }
  .selection-heading {
    font-size: 16px;
    font-weight: bold;
  }
  .step-heading-div {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .text-center {
    text-align: center;
  }
  .message {
    color: red;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .info-para {
    bottom: 150px;
    text-align: center;
    font-size: 20px;
    color: #444;
    font-weight: bold;
  }
  .crop-images-div {
    margin-bottom: 80px;
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .card-details {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 2px solid white;
    border-radius: 10px;
    font-size: 12px;
    margin: 10px;
    img{
      width: 32px;
      height: 32px;
      margin: 0 !important;
      margin-bottom: 10px !important;

    }
  }
  .btn-div {
    position: absolute;
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
    padding: 15px;
    background: #fff;
  }
  .cont-btn {
    width: 100%;
    border: none;
    outline: none;
    background-color: #42855b;
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
  .selected {
    border: 2px solid green;
    border-radius: 10px;
    color: #42855b;
  }
  img.process-loading{
    width: 200px;
  }
</style>
