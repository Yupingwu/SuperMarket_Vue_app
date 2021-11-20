<template>
  <div class="cart-list">
   <scroll class="content" ref="scroll" :probe-type="3">
      <!-- <li v-for="(item,index) in cartList" :key=index>{{item}}</li> -->
      <cart-list-item v-for="(item, index) in cartList" 
                    :key="index" 
                    :item-info="item">
      </cart-list-item>
      
   </scroll>
   
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
  name:"CartList",
  components :{
    Scroll,
    CartListItem,
 
  },
  computed :{
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style>
/* 必须给scroll一个固定高度，才能决定应该如何滚动 */
/* 使用了calc,就必须确定父组件的固定高度 */
/*cart-list的父组件是cart */
  .cart-list {
    height: calc(100% - 44px -49px -40px);
  }
   .content {
    height:  calc(100%);
    overflow: hidden;
    /* position: fixed; */
    /* left: 0;
    right: 0;
    z-index: 0; */
  
  }
</style>