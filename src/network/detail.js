import {request} from "./request"

export function getDetailDatas(iid) {
    return new request({
      url:"/getDetailDatas",
      params:{
        iid
      }
    })

}

export function getRecommend() {
  return request({
    url:"/home/goodsDatas?type=pop&page=1",
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
