import jsonp from 'common/js/jsonp'
import { commonParams, options} from 'api/config'

export function getSingerList(index) {

  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const callback = 'getUCGI'+`${parseInt(Math.random()*Math.pow(10,16))}`
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    // data:'%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A10000%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D',
    data: `{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":${index},"sin":0,"cur_page":1}}}`
  })

  const options = Object.assign({}, options, {
    prefix: callback
  })

  return jsonp(url, data, options)

}
