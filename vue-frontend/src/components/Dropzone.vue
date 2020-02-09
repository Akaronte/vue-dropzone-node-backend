<template>
  <div id="app">
    <vue-dropzone
      ref="dropzone"
      id="drop1"
      :options="dropOptions"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
    <button @click="sendFiles">Send Files</button>
  </div>
</template>

<script>
import vueDropzone from "vue2-dropzone";

export default {
  data: () => ({
    dropOptions: {
      url: "http://localhost:3000/uploadfile",
    //   maxFilesize: 2, // MB
    //   maxFiles: 4,
    //   chunking: true,
    //   chunkSize: 500, // Bytes
    //   thumbnailWidth: 150, // px
    //   thumbnailHeight: 150,
      addRemoveLinks: true,
      autoProcessQueue: false
    }
  }),
    methods: {
    
    afterComplete(file) {
      console.log(file);
    },
    removeAllFiles() {
        this.$refs.dropzone.removeAllFiles(true);
    },
    sendFiles(){
        console.log('Sendfiles');
        this.$refs.dropzone.processQueue();
        console.log('RemoveFiles');
        this.removeAllFiles();
    }
  },
  components: {
    vueDropzone
  }
};
</script>