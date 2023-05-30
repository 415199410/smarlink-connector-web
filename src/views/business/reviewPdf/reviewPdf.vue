<template>



</template>

<script>
export default {
  name:'reviewPdf',
  components: {

  },
  data(){
    return{
      pdfSrc: '',//pdf路径
      numPages: 1,  //  pdf 文件总页数
      id:'',
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.GetProtocolQueryBase();
    });
  },
  methods:{
    goBack(){
      this.$router.back({id:this.id})
    },
  }

}
</script>
<style lang="stylus" scoped></style>
