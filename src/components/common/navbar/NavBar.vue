<template>
    <div class="nav-bar">
        <div class='left'><slot name="left"></slot></div>
        <div class='center'><slot name='center'></slot></div>
        <div class='right'><slot name="right"></slot></div>
        <!-- 导航条上分为三个部分，所以加三个插槽，但是我们要对插槽的位置进行调整，因此用div模块将其包起来 
            用div类名调整，三个插槽还要各自加具名-->
    </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        /* 文字居中 */
        box-shadow: 0 1px 1px rgba(100,100,100,.1);
        /* 不在此处设置背景颜色是因为，不是每个页面的导航条都一个色
            因此，在views的home.vue里的style里设置 */
    }
    .left, .right {
        width: 60px;
        /* background-color: red; */
    }
    .center {
        flex: 1;
        /* background-color: royalblue; */
    }
</style>