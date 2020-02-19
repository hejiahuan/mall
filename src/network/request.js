import axios from "axios"


//这是一种写法

// export function request(config,success,failure) {
//     //1创建axios的实例
//
//     const instance=axios.create({
//       baseURL:"http://httpbin.org",
//       timeout:5000
//     })
//
//     //发送真正的网络请求
//   instance(config).then(
//     res=>{
//       console.log(res);
//       success(res)
//     }
//   ).catch(err=>{
//     console.log(err);
//     failure(err)
//   })
//
// }


// //第二种写法
// export function request(config) {
//   //1创建axios的实例
//
//   const instance=axios.create({
//     baseURL:"http://httpbin.org",
//     timeout:5000
//   })
//
//   //发送真正的网络请求
//   instance(config.basicConfig).then(
//     res=>{
//       //request调用成功后，要调用方法把成功信息res传入前台success方法中
//       config.success(res)
//     }
//   ).catch(err=>{
//     config.failure(err)
//   })
//
// }


// //最终写法
// export function request(config) {
//   return new Promise((reslove,reject)=>{
//     //1创建axios的实例
//
//     const instance=axios.create({
//       baseURL:"http://httpbin.org",
//       timeout:5000
//     })
//
//     //发送真正的网络请求
//     instance(config).then(
//       res=>{
//         reslove(res)
//       }
//     ).catch(err=>{
//       reject(err)
//     })
//   })
// }



// // 最终极写法！！！！！！
// export function request(config) {
//   const instance=axios.create({
//     baseURL:"http://httpbin.org",
//     timeout:5000
//   })
//   console.log(instance)
//   return instance(config)
// }



// 最终极写法！！！！！！
export function request(config) {
  const instance=axios.create({
    baseURL:" http://localhost:7300/mock/5e4a799fc0a41e4d74184c6d",
    timeout:5000
  })


  //axios拦截器
  //请求拦截
  instance.interceptors.request.use(config=>{
    //拦截归拦截，你拦截的东西修改config后，还要返回去！！让行！！不能拦截了就完了，所以得返回
    //console.log(config)

    //1config中的一些信息不符合服务器的要求header
    //2每个发送网络请求时，都希望在界面中显示一个请求的图标，loading!!!动画
    //3某些网络请求登录(token),必须携带一些特殊的信息，如果没有token,跳转拦截登录
    //4对请求参数进行序列化


    return config
  },error=>{
    console.log(error);
  })

  //响应拦截
  instance.interceptors.response.use(res=>{
    //真正要用的是res.data
    console.log(res);
    //可以返回res
    //也可以返回res.data
    return res
  },error => {
    console.log(error)
  })




  return instance(config)
}



