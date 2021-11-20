<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <!-- 加上scroll后，设置scroll-content位置，scroll板块（有颜色）覆盖了tabbar，就看不到了，
    probrtype的作用是监听，若无 :probe-type="3"，在scroll里默认为0，则无法监听得到位置数据 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <!-- <detail-goods :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/> -->
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    
    <back-top @click.native="backClick()" v-show="isShowBackTop"/> 
    <!-- .native - 主要是给**自定义**的组件添加原生事件。 -->
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <toast :message="message" :show="isShow"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoods from './childComps/DetailGoods.vue'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDeTail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList'
import {debouce} from 'common/utils'
import {itemListenerMinxin,backTop} from 'common/mixin'

import DetailBottomBar from './childComps/DetailBottomBar'
import { mapActions } from 'vuex'

// import Toast from 'components/common/toast/Toast'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoods,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,

  },
  mixins:[itemListenerMinxin,backTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo: {},
      recommends:[],
      themeTopYs :[],
      getThemeTopY:null,
      currentIndex: 0,
      // message:'',
      // isShow: false
    }
  },

  created() {
    // console.log(this.$route.params.iid)
    //1.保存传入的iid
    this.iid = this.$route.params.iid
  
    // console.log(this.iid)
    //2.根据iid请求详情数据
    getDeTail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      //2.1 获取轮播图
      this.topImages = data.itemInfo.topImages
      //2.2 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //2.3获取商铺信息
      this.shop = new Shop(data.shopInfo)
      //2.4获取商品描述
      this.detailInfo = data.detailInfo;
      //2.5获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      //2.6.获取评论
      if(data.rate.cRate !==0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(()=>{
      //   //根据最新数据，对应的DOM是已经被渲染出来
      //   //但是图片依然是没有加载完（目前取到的offsetTop不包含图片
        // this.themeTopYs = []

        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        
        // console.log(this.themeTopYs);
      // })
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
    //4。给getThemeTopY赋值
    this.getThemeTopY = debouce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        
        this.themeTopYs.push(Number.MAX_VALUE)

        // console.log(this.themeTopYs);
    },100)

  },
  mounted(){
    this.$bus.$on('itemImgLoad',)
  },
  methods : {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      
    },
    detailImageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position) {
      //1.获取Y值
      const positionY = -position.y
      //2.将Y值与特定位置对比(相应位置则亮相应导航栏参数)
      let length = this.themeTopYs.length

      for(let i = 0;i<length-1;i++){
        //2.1.普通做法（繁琐）
        // if(this.currentIndex !==i && ((i<length-1 && positionY>=this.themeTopYs[i]
        // && positionY<this.themeTopYs[i+1]) || (i===length-1 && positionY>
        // this.themeTopYs[i]))){
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        //2.2.hack做法(即在themeTopYs数组中把Number.MAX_VALUE加入进去，)
          if(this.currentIndex !==i && (positionY>=this.themeTopYs[i]
         && positionY<this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
         }
      }
      //3.判断返回顶部
      this.listenShoBackTop(position)
    },
    addToCart() {
      // console.log('-----');
      //1.获取商品信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2.添加购物车
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      //要想知道Vuex里面做了什么，加一个promise(store->actions)
      // this.$store.dispatch('addCart',product).then(res=> {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        // this.isShow = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = ''
        // },1500)


        this.$toast.show(res,2000)
        console.log(this.$toast);
        // console.log(res);
      })
      //3.添加购物车成功

    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    /* background-color: #fff; */
  

  }
    .content {
      height: calc(100% - 44px - 49px);
     overflow: hidden;
  
  }
</style>