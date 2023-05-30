export const wxCofigMixin = {
  data() {
    return {
      GPSInfo: {} //定位信息
    }
  },
  methods: {
    initWxJs() {
      return new Promise((resolve, reject) => {
        var base64Array = [];
        this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
          url: window.location.href.split('#')[0]
        })
          .then(response => {
            wx.config({
              beta: true,
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
              timestamp: response.status.timestamp, // 必填，生成签名的时间戳
              nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
              signature: response.status.signature, // 必填，签名
              jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
            });
            wx.ready(() => {
              wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
                isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
                success: function (res) {
                  var localIds = res.localIds; // 返回选定照片的本地ID列表，
                  for(var i=0;i<localIds.length;i++) {
                    var localId = localIds[i];
                    wx.getLocalImgData({
                      localId: localId.toString(),
                      success: function (res) {
                        const localData = res.localData;
                        let imageBase64 = '';
                        if (localData.indexOf('data:image') == 0) {
                          //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                          imageBase64 = localData;
                          base64Array.push(imageBase64);
                        } else {
                          //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                          //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                          imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                          base64Array.push(imageBase64);
                        }
                      }
                    })
                  }
                }
              });
              console.log(1234,base64Array);
              resolve(base64Array)
            })
            wx.error((err) => {
              console.log('失败')
              alert('0000');
              reject(err)
            })
          })
        // }

      })
    },
  }
}
