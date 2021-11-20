<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
              :is-checked="isSelectAll" 
              @click.native="checkClick" 
              class="check-button"/>
      <span>全选</span>
    </div>
     <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{CheckLength}})
    </div>
  </div>
  
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
  name:"CartBottomBar",
  components:{
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.isChecked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
      // toFixed保留几位小数
    },
    CheckLength() {
      return this.cartList.filter(item => item.isChecked).length
    },
    isSelectAll() {
      // this.cartList.every(item => item.isChecked);
      return (this.cartList.length === this.CheckLength)
      // return !this.cartList.find(item => !item.isChecked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {//全部选中
          this.cartList.forEach(item => item.isChecked = false)
        } else {//部分或全未选
          this.cartList.forEach(item => item.isChecked = true)
        }
        //  console.log('----');
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style>
  .bottom-bar {
    position: fixed;
  
    display: flex;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left:10px ;
    width: 60px;
    font-size: 14px;
   
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;

    bottom: 49px;
  }
    .price {
    margin-left: 20px;
    flex: 1;
    /* margin-left: -50px; */
  }

  .calculate {
    width: 100px;
    background: rgb(105, 86, 86);
    color: #fff;
    text-align: center;
    bottom: 49px;
  }
</style>