<template>
  <div class="post-container">
    <v-row v-if="!isWeb" align="center" justify="space-around" class="mx-1">
      <v-btn outlined small  color="primary" @click="insertImage">
        <v-icon left>mdi-upload</v-icon>
        Upload
      </v-btn>
      <v-avatar size="24">OR</v-avatar>
      <v-btn small outlined  color="primary" @click="takePhoto">
        <v-icon left>mdi-camera</v-icon>
        Take Picture
      </v-btn>
    </v-row>
    <input v-else id="files" type="file" @change="ShowPreview" />
    <div v-if="path" class="d-flex justify-center">
      <v-img class="mt-7" max-height="250" max-width="350" :src="path"></v-img>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ImageUpload',
    prop: ['value'],
    data() {
      return {
        path: this.value,
        isWeb: !Meteor.isCordova,
      };
    },
    methods: {
      insertImage() {
        navigator.camera.getPicture(
          imageData => {
            console.log(imageData, 'IMageData');
            const imgData = `data:image/jpeg;base64,${imageData}`;
            this.path = imgData;
            this.$emit('input', imgData);
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
            const imgData = `data:image/jpeg;base64,${imageData}`;
            this.path = imgData;
            this.$emit('input', imgData);
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
      // Only For Website
      async ShowPreview(e) {
        console.log(e.target.files[0]);
        const base64 = await this.convertBase64(e.target.files[0]);
        this.path = base64;
        this.$emit('input', base64);
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
