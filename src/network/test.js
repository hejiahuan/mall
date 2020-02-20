{
  data:function({_req,Mock}) {
      let i = 0,
      _data = [],
      type = _req.query.type,
      page = _req.query.page,
      pageSize=10,
      len = (1000 - pageSize * (page - 1)) < pageSize ? (1000 - pageSize * (page - 1)) : pageSize;
      if(type==="pop" &&page!=null){
        for (i; i < len; i++) {
          _data.push(
            Mock.mock({
              "title|n": "@csentence",
              "content|1": [
                "https://s5.mogucdn.com/mlcdn/c45406/190120_8547kcje5824h3c1b3jga898dg656_640x960.jpg_360x480.v1cAC.40.webp",
                'https://s5.mogucdn.com/mlcdn/776a41/200218_518hcckif5a24348fi5ljef35idd0_750x1125.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/776a41/200219_23h0jd9jc7edfel8la721lbk4ffdd_750x1125.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/190306_74ef4fli7k8kda6c2a2bhdjb27dkh_640x960.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/55cf19/190817_6b7ig39cikb788i1jf5i8jkd37haf_640x960.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/181205_4cgh4i5l0ahb6731bak1lhei01204_640x853.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/190111_4ecg4c2d6aegj0l24i8840cg3cdjf_640x960.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/17f85e/200217_78g1lgh19886h1gk22e61ha91c97j_640x960.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/190909_87l9a7ka5jg68ecggf1g7hcl60d65_640x960.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/191229_47e5h03l9ae8deh93h64k60k9ff73_6664x9996.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/181210_50ldbcd5ci43ee7i60d69f65c12k7_640x960.jpg_360x480.v1cAC.40.webp',
                'https://s5.mogucdn.com/mlcdn/c45406/191028_82b10d6gl5cg6j86ch154aejcl3k7_3332x4999.jpg_360x480.v1cAC.40.webp'

              ]


            })
          )


        }
      }
    if(type==="news" &&page!=null){
      for (i; i < len; i++) {
        _data.push(
          Mock.mock({
            "title|n": "@csentence",
            "content|1": [
              "https://s5.mogucdn.com/mlcdn/c45406/190120_8547kcje5824h3c1b3jga898dg656_640x960.jpg_360x480.v1cAC.40.webp",
              'https://s5.mogucdn.com/mlcdn/776a41/200218_518hcckif5a24348fi5ljef35idd0_750x1125.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/776a41/200219_23h0jd9jc7edfel8la721lbk4ffdd_750x1125.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/190306_74ef4fli7k8kda6c2a2bhdjb27dkh_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/55cf19/190817_6b7ig39cikb788i1jf5i8jkd37haf_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/181205_4cgh4i5l0ahb6731bak1lhei01204_640x853.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/190111_4ecg4c2d6aegj0l24i8840cg3cdjf_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/17f85e/200217_78g1lgh19886h1gk22e61ha91c97j_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/190909_87l9a7ka5jg68ecggf1g7hcl60d65_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/191229_47e5h03l9ae8deh93h64k60k9ff73_6664x9996.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/181210_50ldbcd5ci43ee7i60d69f65c12k7_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/191028_82b10d6gl5cg6j86ch154aejcl3k7_3332x4999.jpg_360x480.v1cAC.40.webp'

            ]


          })
        )


      }
    }
    if(type==="sells" &&page!=null){
      for (i; i < len; i++) {
        _data.push(
          Mock.mock({
            "title|n": "@csentence",
            "content|1": [
              "https://s5.mogucdn.com/mlcdn/c45406/190120_8547kcje5824h3c1b3jga898dg656_640x960.jpg_360x480.v1cAC.40.webp",
              'https://s5.mogucdn.com/mlcdn/776a41/200218_518hcckif5a24348fi5ljef35idd0_750x1125.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/776a41/200219_23h0jd9jc7edfel8la721lbk4ffdd_750x1125.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/190306_74ef4fli7k8kda6c2a2bhdjb27dkh_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/55cf19/190817_6b7ig39cikb788i1jf5i8jkd37haf_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/181205_4cgh4i5l0ahb6731bak1lhei01204_640x853.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/190111_4ecg4c2d6aegj0l24i8840cg3cdjf_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/17f85e/200217_78g1lgh19886h1gk22e61ha91c97j_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/190909_87l9a7ka5jg68ecggf1g7hcl60d65_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/191229_47e5h03l9ae8deh93h64k60k9ff73_6664x9996.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/181210_50ldbcd5ci43ee7i60d69f65c12k7_640x960.jpg_360x480.v1cAC.40.webp',
              'https://s5.mogucdn.com/mlcdn/c45406/191028_82b10d6gl5cg6j86ch154aejcl3k7_3332x4999.jpg_360x480.v1cAC.40.webp'

            ]


          })
        )


      }
    }


    return _data


  }
}
