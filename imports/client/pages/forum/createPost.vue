<template>
  <div class="post-container">
    <ImageUpload v-model="path" />
    <v-container fluid class="mt-5">
      <v-textarea
        v-model="description"
        outlined
        clearable
        counter
        clear-icon="mdi-close-circle"
        label="Enter Description"
      ></v-textarea>
    </v-container>
    <v-btn class="ma-2" :loading="loading" :disabled="loading" color="success" @click="createPost">Submit</v-btn>
  </div>
</template>

<script>
  import ImageUpload from '../../components/imageUpload.vue';

  export default {
    name: 'CreatePost',
    components: {
      ImageUpload,
    },
    data() {
      return {
        description: '',
        path: undefined,
        loading: false,
        isWeb: !Meteor.isCordova,
      };
    },
    methods: {
      createPost() {
        this.loading = true;
        // Need to Create Meteor Method to Upload The Image and Create Post
      },
      insertImage() {
        navigator.camera.getPicture(
          imageData => {
            console.log(imageData, 'IMageData');
            this.path = `data:image/jpeg;base64,${imageData}`;
          },
          cameraError => {
            console.log(cameraError, 'cameraError');
          },
          {
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.DATA_URL,
          },
        );
      },
      takePhoto() {
        navigator.camera.getPicture(
          imageData => {
            console.log(imageData, 'IMageData');
            this.path = `data:image/jpeg;base64,${imageData}`;
          },
          cameraError => {
            console.log(cameraError, 'cameraError');
          },
          {
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            destinationType: navigator.camera.DestinationType.DATA_URL,
          },
        );
      },
      getEndpoint() {
        Meteor.call('getAuthEndPoint', this.path, 'abc.jpg', (err, res) => {
          console.log(err, res);
        });
      },

      // Only For Website
      async ShowPreview(e) {
        console.log(e.target.files[0]);
        const base64 = await this.convertBase64(e.target.files[0]);
        this.path = base64;
      },
      convertBase64(file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = error => {
            reject(error);
          };
        });
      },
    },
  };
</script>

<style></style>
