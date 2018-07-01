import Screenshow from './Screenshow.html'
import 'swiper/dist/css/swiper.min.css'
import './main.css'

Screenshow.create = function(el, data) {
  return new this({
    target: el,
    data,
  })
}
window.Fsss = Screenshow
export default Screenshow
