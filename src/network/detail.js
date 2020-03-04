import {request} from "./request"

export function getDetailDatas(iid) {
    return new request({
      url:"http://localhost:7300/mock/5e4a799fc0a41e4d74184c6d/getDetailDatas",
      params:{
        iid
      }
    })

}

/**
 * es6的写法简直跟java一样一样的
 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
