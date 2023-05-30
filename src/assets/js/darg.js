import Vue from 'vue';
//使用Vue.directive()定义一个全局指令
//1.参数一：指令的名称，定义时指令前面不需要写v-
//2.参数二：是一个对象，该对象中有相关的操作函数
//3.在调用的时候必须写v-
const drag = Vue.directive('drag', {
  bind: function (el) {
    let odiv = el; //获取当前元素
    let firstTime = '',
      lastTime = '';
    odiv.onmousedown = (e) => {
      document.getElementById('dragbtn').setAttribute('data-flag', false)
      firstTime = new Date().getTime();
      //  算出鼠标相对元素的位置
      var disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        //  用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let top = e.clientY - disY;
        let left = e.clientX - disX;
        //  页面范围内移动元素
        if (top > 0 && top < document.body.clientHeight - 48) {
          odiv.style.top = top + 'px';
          el.style.left = left + 'px'
        }
      };
      document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmouseup = null;
        // onmouseup 时的时间，并计算差值
        lastTime = new Date().getTime();
        if ((lastTime - firstTime) < 200) {
          document.getElementById('dragbtn').setAttribute('data-flag', true)
        }
      };
    };
  }
})
export default drag;
