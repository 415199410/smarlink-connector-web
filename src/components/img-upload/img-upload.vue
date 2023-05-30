<template>
  <div class="img-upload">
    <div class="upload" v-for="(item, index) in list" :key="index">
      <div class="normal" v-show="!item.edit">
        <input class="fileInput" type="file"  @change="upload($event, index)"  accept="image/*" multiple />
        <i class="iconfont icontianjiatupian"></i>
        <span>添加图片</span>
      </div>
      <div class="img-show" v-show="item.edit">
        <img :src="item.url" />
        <i @click="delItem(index)" class="iconfont iconxxx-"></i>
      </div>

    </div>
  </div>
</template>
<script>

    export default {
        name: "img-upload",
        props: {
            max: {
                type: Number,
                default: 40
            }
        },
        data() {
            return {
                list: [
                    {
                        url: "",
                        edit: false
                    }
                ]
            };
        },
        methods: {
            upload(e, index) {
                //let file = e.target.files[0];
                let fileList = e.target.files;
                if(fileList.length>30){
                  this.$createToast({txt: "选择图片的张数不能超过30张！", type: "txt"}).show();return;
                }
               for (let i = 0; i < fileList.length; i++) {
                    let file1 = fileList[i];
                    if(Number(i)==0){
                      alert("图片添加中，请耐心稍等........")
                    }
                    if (file1.size / 512 > 1) {
                        this.photoCompress(file1,{
                                quality: 0.5
                            },(base64Codes) => {
                                this.list.splice(index, 0, {
                                    url: base64Codes,
                                    file: this.dataURLtoFile(base64Codes, file1.name),
                                    edit: true
                                });
                            }
                        );
                    } else {
                      let reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = e => {
                        this.list.splice(index, 1, {
                          url: e.target.result,
                          file: file,
                          edit: true
                        });
                      //  this.clearFile();
                      };
                    }
                }
                this.clearFile();
                if (this.list.length < this.max) {
                    // this.list.push({
                    //   url: "",
                    //   edit: false
                    // });
                }

                /* if (file.size / 512 > 5) {
                   this.photoCompress(
                     file,
                     {
                       quality: 0.5
                     },
                     (base64Codes) => {
                       this.list.splice(index, 1, {
                         url: base64Codes,
                         file: this.dataURLtoFile(base64Codes, file.name),
                         edit: true
                       });
                     }
                   );
                 } else {
                   console.log('11',11)
                   let reader = new FileReader();
                   reader.readAsDataURL(file);
                   reader.onload = e => {
                     this.list.splice(index, 1, {
                       url: e.target.result,
                       file: file,
                       edit: true
                     });

                     this.clearFile();
                   };
                 }*/
                //this.clearFile();
                // if (this.list.length < this.max) {

                //   this.list.push({
                //     url: "",
                //     edit: false
                //   });
                //}

            },
            clearFile() {
                Array.from(document.getElementsByClassName("fileInput")).forEach(item => {
                    item.value = "";
                });
            },
            delItem(index) {
                this.list.splice(index, 1);
                if (
                    this.list.length === this.max - 1 &&
                    this.list[this.list.length - 1].edit
                ) {
                    this.list.push({
                        url: "",
                        edit: false
                    });
                }
            },
            photoCompress(file, w, objDiv) {
                let ready = new FileReader();
                /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
                ready.readAsDataURL(file);
                ready.onload = (e)=> {
                  let re = e.target.result;
                  this.canvasDataURL(re, w, objDiv);
                };
            },
            canvasDataURL(path, obj, callback) {
                let img = new Image();
                img.src = path;
                img.onload = function() {
                    let that = this;
                    let _this = this;
                    // 默认按比例压缩
                    let w = that.width,
                        h = that.height,
                        scale = w / h;
                    w = obj.width || w;
                    h = obj.height || w / scale;
                    let quality = 0.7; // 默认图片质量为0.7
                    //生成canvas
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    // 创建属性节点
                    let anw = document.createAttribute("width");
                    anw.nodeValue = w;
                    let anh = document.createAttribute("height");
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    let base64 = canvas.toDataURL("image/jpeg", quality);
                    // let urlFile = _this.dataURLtoFile(base64)  //这个地方的处理是为了把压缩的base64转化为对象，获得压缩后图片的大小size，方便对压缩后的图片再次进行判断；
                    // console.log(urlFile)
                    // if(urlFile.size/1024 > 1025){
                    //    console.log("图片过大，请重新上传图片")
                    // }else{
                    //_this.partitionBase = base64.split(",")[1]
                    //_this.imgType ="."+urlFile.type.split("/")[1]
                    //  }
                    // 回调函数返回base64的值
                    callback(base64);
                };
            },
            // 将base64转换成file对象
            dataURLtoFile(dataurl, filename = "file") {
                let arr = dataurl.split(",");
                console.log(arr)
                let mime = arr[0].match(/:(.*?);/)[1];
                let suffix = mime.split("/")[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], `${filename}.${suffix}`, { type: mime });
            },
            getList() {
                return this.list;
            }
        }
    };
</script>
<style lang="stylus" scoped>
  @import '../../assets/css/index.styl';

  .img-upload {
    display: flex;
    flex-wrap: wrap;

    .upload {
      width: 23%;
      height: 0;
      padding-bottom: 23%;
      margin-right: 2%;
      margin-bottom: convert(10);
      position: relative;

      &:nth-child(4n) {
        margin-right: 0;
      }

      .normal {
        width: 100%;
        height: 100%;
        border: 1px solid #EAEAEA;
        background-color: #F7F7F7;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;

        input {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 10;
          opacity: 0;
        }

        i {
          font-size: 15px;
          color: #EAEAEA;
        }

        span {
          margin-top: convert(8);
          font-size: convert(12);
          color: #E0E0E0;
        }
      }

      .img-show {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

        img {
          width: 100%;
          height: 100%;
        }

        i {
          width: 10px;
          height: 10px;
          color: #FF3F1C;
          position: absolute;
          top: -5px;
          right: -5px;
          text-align: center;
          line-height: 10px;
          z-index: 2;
        }
      }
    }
  }
</style>
