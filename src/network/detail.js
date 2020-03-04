import {request} from "./request"

export function getDetailDatas(iid) {
    return new request({
      url:"http://localhost:7300/mock/5e4a799fc0a41e4d74184c6d/getDetailDatas",
      params:{
        iid
      }
    })

}
