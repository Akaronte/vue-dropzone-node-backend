<template>
<div id="app">

    <div v-for="(file, i) in files" :key="i" >
      {{file}}
    </div>

</div>
</template>

<script>
import Request from 'axios-request-handler';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    files: []
  }),
  methods: {
    fetchFiles(){
      let files= new Request('http://localhost:3000/files');
      files.get().then(res => (console.log(res)))
      files.poll(5000).get((response) => {
        if(response.data.length){
          this.files = response.data;
          console.log(this.files);
        }
    });
    }
  
  },
  mounted() {
    console.log('mounted')
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
