// 添加订单列表
const GET_BOSS_ORDERLIST = '/ajax/route?func=/v2/order/get-boss-orderlist'
// 发货并添加快递信息
const SEND = '/ajax/route?func=/v2/order/send'
// 完成收货
const RECEIVE = '/ajax/route?func=/v2/order/receive'

export {
  GET_BOSS_ORDERLIST,
  SEND,
  RECEIVE,
}