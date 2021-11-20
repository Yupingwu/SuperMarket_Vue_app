import {debouce} from "./utils"
import BackTop from 'components/content/BackTop/BackTop'

export const itemListenerMinxin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debouce(this.$refs.scroll.refresh,100)
    
    this.itemImgListener = () =>{
      newRefresh()
    }
   
    this.$bus.$on('itemImgLoad',this.itemImgListener)
   
  }
}

export const backTop = {
  components:{
    BackTop
  },
  data() {
    return{
      isShowBackTop:false
    }
  },
  methods: {
    backClick() {
      console.log("点击"),
      this.$refs.scroll.scrollTo(0, 0,300)
          // scrollTo(x位置,y位置,time返回时间)
          // 先拿scroll组件,再拿该组件中的方法scrollTo
    },
    listenShoBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}