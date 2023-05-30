import Vue from 'vue'
let vm = new Vue()

function queryDuctuinaryForKey(key) {
  return vm.GLOBAL.dictionaryData[key]
}

function queryDuctuinaryForId(key, pkId) {
  let t = queryDuctuinaryForKey(key)
  let name = ''
  for (let i in t) {
    if (t[i].pkId == pkId) {
      name = t[i].dName
    }
  }
  return name
}

function http(url, data, method = 'post') {
  let formData = new FormData()
  if (data) {
    let temp = deepClone(data)
    let str = JSON.stringify(temp)
    formData.append('reqParam', str)
  }
  return new Promise(function (resolve, reject) {
    vm.$http({
      url:  vm.GLOBAL.API +url, //  // 2022 02 28暂时注释
      method: method,
      data: formData,
      timeout:300000
    }).then(res => {
      if (res.data.retCode === 200) {
        resolve(res.data.retVal)
      } else {
        alert(res.data.retVal);
        reject(res.data)
      }
    }).catch(() => {alert('连接不到网络，请重试！');reject(null)});
  })
}

function exportFile(url, data, flag = 0) {
  let formData = new FormData()
  if (flag != 0) {
    formData.append('reqParam', JSON.stringify(data))
  } else {
    for (let i in data) {
      formData.append(i, data[i])
    }
  }
  if (sessionStorage.getItem(vm.GLOBAL.tokenName)) {
    formData.append('token', sessionStorage.getItem(vm.GLOBAL.tokenName))
  }
  const loading = vm.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return new Promise(function (resolve, reject) {
    vm.$http({
      url: vm.GLOBAL.API + url,
      method: 'post',
      responseType: 'blob',
      data: formData
    }).then(res => {
      loading.close()
      console.log(res)
      if (typeof res.headers['content-disposition'] !== 'undefined') {
        let t = res.headers['content-disposition'].split(';')[1]
        t = t.split('=')[1]
        if (window.navigator.msSaveBlob) {
          let fileObj = new Blob([res.data])
          window.navigator.msSaveBlob(fileObj, t)
        } else {
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', t)
          document.body.appendChild(link)
          link.click()
        }
        resolve()
      } else {
        let reader = new FileReader()
        reader.onload = e => {
          let m = e.target.result
          // vm.$message.error(m)
          reject()
        }
        reader.readAsText(res.data)

      }
    }).catch((err) => {
      loading.close()
    })
  })
}

// 深层拷贝
function deepClone(obj) {
  let type = Object.prototype.toString.call(obj); //通过原型对象获取对象类型
  let newObj;
  if (type === '[object Array]') {
    //数组
    newObj = [];
    if (obj.length > 0) {
      for (let x = 0; x < obj.length; x++) {
        newObj.push(deepClone(obj[x]));
      }
    }
  } else if (type === '[object Object]') {
    //对象
    newObj = {};
    for (let x in obj) {
      newObj[x] = deepClone(obj[x]);
    }
  } else {
    //基本类型和方法可以直接赋值
    newObj = obj;
  }
  return newObj;
}

function check(data, labelList, lenList, typeList) {
  let count = 0
  for (let i in data) {
    if (typeof data[i] === 'undefined' || data[i].toString().trim().length === 0) {
      count++
      let flag = false
      for (let j in labelList) {
        if (j === i) {
          flag = true
          vm.$createToast({
            txt: labelList[j] + '不能为空!',
            type: "txt"
          }).show()
          return
        }
      }
      // 如果报错名称里没有这个属性说明无需校验
      if (!flag) {
        count--
      }
    } else {
      for (let z in lenList) {
        if (z === i) {
          if (data[i].toString().trim().length > lenList[z]) {
            count++
            for (let j in labelList) {
              if (j === i) {
                vm.$createToast({
                  txt: labelList[j] + '的长度不能大于' + lenList[z] + '!',
                  type: "txt"
                }).show()
                return
              }
            }
          }
        }
      }
      for (let a in typeList) {
        if (a === i) {
          if (typeList[a] === 'int') {
            if (!/^[1-9][0-9]*$/.test(data[i])) {
              count++
              for (let j in labelList) {
                if (j === i) {
                  // Message.warning(labelList[j] + '的类型只能是数字且不能以0开头!')
                  vm.$createToast({
                    txt: labelList[j] + '的类型只能是数字且不能以0开头!',
                    type: "txt"
                  }).show()
                  return
                }
              }
            }
          } else if (typeList[a] === 'float') {
            if (!/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/.test(data[i])) {
              count++
              for (let j in labelList) {
                if (j === i) {
                  // Message.warning(labelList[j] + '的类型只能是浮点型')
                  vm.$createToast({
                    txt: labelList[j] + '的类型只能是浮点型',
                    type: "txt"
                  }).show()
                  return
                }
              }
            }
          }
        }
      }
    }
  }
  return count === 0 ? true : false
}

// 解析URL
function URLFormat() {
  let href = window.location.href;
  let url = ''
  if (href.includes("?code") && !href.includes('/#/') ) {
    //url包括 com/?code 证明为从微信跳转回来的
    let arr = href.split('#/')
    if(arr.length===1) {
      arr = arr[0].split('/?')
      url = `${arr[0]}/#/?${arr[1]}`
    } else {
      let arr1 = arr[0].split('/?')
      url = `${arr1[0]}/#/${arr[1]}?${arr1[1]}`
    }
    window.location.href = url
    return false
  }
  return true

}

export default {
  http,
  check,
  queryDuctuinaryForKey,
  queryDuctuinaryForId,
  exportFile,
  URLFormat
}
