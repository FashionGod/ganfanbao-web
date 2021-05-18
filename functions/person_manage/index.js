// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100
const wxContext = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    if (event.role == 0) { // 0商家 1骑手 2平台
      let merchantCountResult = await db.collection('merchantSignUpInfoCollection').count()
      if (event.operate == 0) {
        if (event.tags && event.tags.length>0) {
          return db.collection('merchantSignUpInfoCollection').where({
            checked: event.tag[0] == 0? true : false
          })
          .skip((event.current-1)*event.pageSize)
          .limit(event.pageSize)
          .get()
          .then(res => {
              return handleSuccess(res.data)
            })
            .catch(err => {
              return handleErr(err)
            })
        }
        else {
          return db.collection('merchantSignUpInfoCollection')
          .skip((event.current-1)*event.pageSize)
          .limit(event.pageSize)
          .get()
          .then(res => {
              return handleSuccess(res.data)
            })
            .catch(err => {
              return handleErr(err)
            })
        }
      } else if (event.operate == 1) {

      }
    } else if (event.role == 1) {
      return db.collection('riderSignUpCollection').doc(event.id).update({
          data: {
            checked: true
          }
        })
        .then(res => {
          return handleSuccess(res.data)
        })
        .catch(err => {
          return handleErr(err)
        })
    }
  } catch (err) {
    return handleErr(err)
  }
}

function handleSuccess(data = {}) {
  return {
    success: true,
    data: data
  }
}

function handleErr(err) {
  return {
    success: false,
    err: err
  }
}
