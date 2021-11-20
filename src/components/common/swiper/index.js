import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

export {
  Swiper, SwiperItem
}
// 轮播图组件，如果没有这个js文件，则这两个.vue文件要在Home.vue那里
// import，这样代码就很繁琐，在此文件夹下写一个.js文件导出Swiper, SwiperItem，
//import {Swiper, SwiperItem} from 'components/common/swiper'
//  则可在外面使用了。
//而不用 ：
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
