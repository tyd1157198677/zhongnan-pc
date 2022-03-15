/**
 *
 * @param time
 * @param format "yyyy-MM-dd hh:mm:ss"
 * @returns {*}
 */
export function parseTime (time, format = 'yyyy-MM-dd hh:mm:ss') {
  if (arguments.length === 0) {
    return null
  }

  if (!time) {
    return time
  }

  let date

  if (typeof time === 'object') {
    date = time
  } else if (typeof time === 'string') {
    date = new Date(time)
  } else if (typeof time === 'number') {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }

  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds()
    // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}
// 获取两个事件差，如果小于一小时返回分钟差，大于一小时小于24小时返回小时差，否则返回天数差
export function getDateDiff (startTime, endTime, type, num) {
  const sTime = new Date(startTime)
  const eTime = new Date(endTime)
  var diff = eTime.getTime() - sTime.getTime()
  if (type === '') {
    if (diff < 3600 * 1000) {
      return (diff / 60 / 1000).toFixed(num) + '分钟'
    } else if (diff >= 3600 * 1000 && diff < 24 * 3600 * 1000) {
      return (diff / 3600 / 1000).toFixed(2) + '小时'
    } else {
      return (diff / 24 / 3600 / 1000).toFixed(num) + '天'
    }
  } else if (type === 'min') {
    return (diff / 60 / 1000).toFixed(num) + '分钟'
  } else if (type === 'hour') {
    return (diff / 3600 / 1000).toFixed(num) + '小时'
  } else if (type === 'day') {
    return (diff / 24 / 3600 / 1000).toFixed(num) + '天'
  }
}

/**
 * 数组分组
 * @param array 
 * @param id 
 */
export function groupBy(array, id) {
  let groups = {};
  array.forEach( function( o ) {
      let group = JSON.stringify( o[id] );
      groups[group] = groups[group] || [];
      groups[group].push( o );
  });
  return Object.values(groups);
}