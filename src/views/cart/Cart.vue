<template>
<div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
   
   <!-- 商品列表 -->
  
   <cart-list/>
   <!-- 底部汇总 -->
   <cart-bottom-bar/>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
// import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'

  export default {
     name: "Cart",
    components: { 
      NavBar,
      CartList,
      CartBottomBar,
      // Scroll,
    },
    computed: {
      //mapGetters辅助函数仅仅是将getter映射到局部计算属性
     ...mapGetters(['cartLength','cartList'])
    },
     
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  /* .content {
    height: 100vh;
    background-color: steelblue;
    overflow-x: hidden; 
  } */

</style>
