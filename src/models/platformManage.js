// 内核
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "ganfanbao-1goayejba4ec1d03"
});

class PlatformManageModel {
    getMerchantList(data) {
        return app.callFunction({
            // 云函数名称
            name: "judge_checked",
            // 传给云函数的参数
            data: {
              role: data.role, // 0管理商家 1管理骑手
              id: data.id,
            }
          })
          .then((res) => {
            console.log(res);
            return res
          })
          .catch(console.error);
    }
    approve(data) {
        return app.callFunction({
            // 云函数名称
            name: "judge_checked",
            // 传给云函数的参数
            data: {
              role: data.role, // 0管理商家 1管理骑手
              id: data.id,
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
    PlatformManageModel
}