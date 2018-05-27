import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        console.log(data)
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let urlData = ''
  for (var key in data) {
    let value = data[key] === undefined ? '' : data[key]
    urlData += `&${key}=${encodeURIComponent(value)}`
  }
  // Array.splice.apply(urlData, 0, 1)
  return urlData ? urlData.substring(1) : ''
}
