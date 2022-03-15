import Vue from 'vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
const Message = ElementUI.Message
const defaultConfig = {
  duration: 1000
}
const msgArr = ['success', 'warning', 'info', {
  type: 'error',
  duration: 3000
}]
const Msg = function (config) {
  config = {
    ...defaultConfig,
    ...config
  }
  return Message(config)
}
for (const key in msgArr) {
  if (Object.prototype.toString.call(msgArr[key]) === '[object Object]') {
    Msg[msgArr[key].type] = function (message) {
      return Msg({
        message,
        ...msgArr[key]
      })
    }
  } else {
    Msg[msgArr[key]] = function (message) {
      return Msg({
        message,
        type: msgArr[key]
      })
    }
  }
}

Object.defineProperties(Vue.prototype, {
  $msg: {
    get () {
      return Msg
    }
  }
})
