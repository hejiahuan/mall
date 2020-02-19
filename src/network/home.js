import {request} from "./request"

/**
 * 这里把network每个页面的也封装起来了
 * @constructor
 */
export function GetHomeData() {
    return  request({url:"/home/multidata"})
}
