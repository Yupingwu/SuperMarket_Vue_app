import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
    //mutations唯一的目的就是修改state中的状态、
    //mutations 中的每个方法尽可能完成的事件单一一点
      // 对于逻辑比较复杂的事件，最好不要放在mutations中，应该放在actions
    [ ADD_COUNTER](state,payload){
      payload.count++;
    },
    [ ADD_TO_CART](state,payload){
      // payload.checked = true
      payload.isChecked = true
      state.cartList.push(payload)
    }
}