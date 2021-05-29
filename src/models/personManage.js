// 内核
import cloudbase from "@cloudbase/js-sdk";
const app = cloudbase.init({
  env: "ganfanbao-1goayejba4ec1d03"
});

class PersonManageModel {
    getPersonList(data) {
      console.log(data)
        return app.callFunction({
            // 云函数名称
            name: "person_manage",
            // 传给云函数的参数
            data: {
              role: data.role,
              operate: data.operate,
              pageSize: data.pageSize,
              current: data.current,
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
            name: "person_manage",
            // 传给云函数的参数
            data: {
              role: data.role, // 0管理商家 1管理骑手
              id: data.id,
              checked: data.checked,
              operate: 1, // 0查询 1审核
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
  PersonManageModel
}