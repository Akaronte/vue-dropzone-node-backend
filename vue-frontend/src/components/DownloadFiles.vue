<template>
<div id="app">

    <div v-for="(file, i) in files" :key="i" >
      <button @click="downloadWithAxios(file)">{{file}}</button>
    </div>

</div>
</template>

<script>
import Request from 'axios-request-handler';
import axios from 'axios';
export default {

  data: () => ({
    files: [],
    url_back: 'http://localhost:3000'
  }),
  methods: {
    fetchFiles(){
      let files= new Request(this.url_back+'/files');

      files.poll(5000).get((response) => {
        if(response.data.length){
          this.files = response.data;
        }
    });
    },
    downloadWithAxios(filename){
      let get_url = this.url_back+'/getfile?file='+filename

      axios({
        method: 'get',
        url: get_url,
        responseType: 'arraybuffer'
      })
      .then(response => {
        
        this.forceFileDownload(response,filename)
        
      })
      .catch(() => console.log('error occured'))
    },
    forceFileDownload(response,filename){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename) 
      document.body.appendChild(link)
      link.click()
    },
  
  },
  mounted() {
    console.log('begin fetch files')
    this.fetchFiles();
  }
}
</script>
new Vue({
  el: '#app',
  data: {
    items: []
  },
  methods: {
    loadData: function () {
      $.get('/api/data', function (response) {
        this.items = response.items;
      }.bind(this));
    }
  },
  ready: function () {
    this.loadData();

    setInterval(function () {
      this.loadData();
    }.bind(this), 30000); 
  }
});
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
