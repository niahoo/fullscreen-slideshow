import Screenshow from './Screenshow.html';
require('swiper/dist/css/swiper.min.css')
require('./main.css')

Screenshow.create = function(el, data) {
  return new this({
    target: el,
    data,
  })
}

window.Fsss = Screenshow
export default Screenshow
