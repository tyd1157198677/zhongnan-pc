import { Loading } from 'element-ui'
 
let loadingCount = 0
let loading
 
const startLoading = (options = {}) => {
    loading = Loading.service({
        lock: true,
        fullscreen: false,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)',
        ...options,
    })
}
 
const endLoading = () => {
    loading.close()
}
 
export const show = (options) => {
    if (loadingCount === 0) {
        startLoading(options)
    }
    loadingCount += 1
}
 
export const hide = () => {
    if (loadingCount <= 0) {
        return
    }
    loadingCount -= 1
    if (loadingCount === 0) {
        endLoading()
    }
}

export default function(Vue) {
      //添加全局API
     Vue.prototype.$loading = {
        show,
        hide
    }
}
