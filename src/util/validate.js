/**
 * 合法uri
 * @param textval
 * @returns {boolean}
 */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/**
 * 小写字母
 * @param str
 * @returns {boolean}
 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * 大写字母
 * @param str
 * @returns {boolean}
 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * 大小写字母
 * @param str
 * @returns {boolean}
 */
export function validateAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function validateUsername (str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}


/**
 * 验证身份证号
 * @param id
 * @returns {boolean}
 */
export function validateId (id) {
  const re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  return re.test(id)
}

/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function validateMobile (mobile) {
  const re = /(?:0|86|\+86)?1[3456789]\d{9}/
  return re.test(mobile)
}

export function validateCode (str) {
  const re = /^[A-Za-z_]+$/
  return re.test(str)
}

export function validatePasswordStrength (str) {
  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/
  return re.test(str)
}

export function validateNum (str) {
  const re = /^\d+$/
  return re.test(str)
}

export function dateFormat (dateString, format) {
  if (!dateString) return ''
  const time = new Date(
    dateString
      .substr(0, 19)
      .replace('-', '/')
      .replace('-', '/')
      .replace('T', ' ')
      .replace('T', ' ')
  )
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  }
  if ( /(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (time.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for ( const k in o)
    if ( new RegExp('(' + k + ')').test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return format
}
