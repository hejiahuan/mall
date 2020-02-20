import {request} from "./request"

/**
 * 这里把network每个页面的也封装起来了
 * @constructor
 */
export function GetHomeData() {
    return  request({url:"/home/multidata"})
}


export  function GetGoodsData(type,page) {
    return request({
      url:"/home/goodsDatas",
      params:{
        type,
        page
      }

    })
}


