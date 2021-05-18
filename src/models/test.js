// 内核
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "ganfanbao-1goayejba4ec1d03"
});

class TestModel {
    testHelloWord() {
        console.log(cloudbase)
        return app.callFunction({
            // 云函数名称
            name: "hello_word",
            // 传给云函数的参数
            data: {
              a: 1
            }
          })
          .then((res) => {
            console.log(res);
            return res
          })
          .catch(console.error);
    }
}


export {
    TestModel
}