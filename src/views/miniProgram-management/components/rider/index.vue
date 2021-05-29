<template>
  <div>
    <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange">
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> 骑手名</span>
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="
          tag === '未审核' ? 'volcano' : 'green'
        "
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a @click="showDrawer(record)">查看详情</a>
      <a-divider type="vertical" />
        <a-popconfirm
          title="你确定改变审核状态？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirm(record)"
          @cancel="cancel"
        >
        <a>更改状态</a>
        </a-popconfirm>
    </span>
    </a-table>
    <a-drawer
        title="详情信息"
        :width="900"
        placement="right"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
          <a-descriptions bordered>
          <a-descriptions-item label="姓名">
            {{drawerData?drawerData.riderSignUpInfo.name:''}}
          </a-descriptions-item>
          <a-descriptions-item label="手机号">
            {{drawerData?drawerData._id:''}}
          </a-descriptions-item>
          <a-descriptions-item label="身份证号">
            {{drawerData?drawerData.riderSignUpInfo.IDNumber:""}}
          </a-descriptions-item>
          <a-descriptions-item label="手持身份证正面">
            <a-popover>
              <template slot="content">
                <img :src="drawerData?imgTransObj.IdAndPerson:''" alt="手持身份证正面" width="500px" height="500px">
              </template>
              <img :src="drawerData?imgTransObj.IdAndPerson:''" alt="手持身份证正面" width="120px" height="120px">
            </a-popover>
          </a-descriptions-item>
          <a-descriptions-item label="手持身份证反面">
            <a-popover>
              <template slot="content">
               <img :src="drawerData?imgTransObj.IdReverse:''" alt="手持身份证反面" width="500px" height="500px">
              </template>
              <img :src="drawerData?imgTransObj.IdReverse:''" alt="手持身份证反面" width="120px" height="120px">
            </a-popover>
          </a-descriptions-item>
          <a-descriptions-item label="身份证正面">
            <a-popover>
              <template slot="content">
                <img :src="drawerData?imgTransObj.IdFront:''" alt="身份证正面" width="500px" height="500px">
              </template>
              <img :src="drawerData?imgTransObj.IdFront:''" alt="身份证正面" width="120px" height="120px">
            </a-popover>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
  </div>
</template>
<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "注册电话",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "审核状态",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];

import { PersonManageModel } from "../../../../models/personManage";
const personManageModel = new PersonManageModel();
export default {
  data() {
    return {
      visible: false,
      data,
      columns,
      pagination: {},
      loading: false,
      drawerData: null,
      imgTransObj: null,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer(record) {
      console.log(record.orginalObj)
      this.visible = true;
      this.drawerData = record.orginalObj;
      this.imgTransObj = {...record.orginalObj.riderSignUpInfo.riderSignUpImages};
      for (let obj in this.imgTransObj) {
        let tmpUrl = 'https://'
        let tmpStr = this.imgTransObj[obj].split('.')[1]
        let tmpIndex = tmpStr.indexOf('/',9)
        tmpUrl = tmpUrl + tmpStr.substring(0,tmpIndex) + '.tcb.qcloud.la' + tmpStr.substring(tmpIndex, tmpStr.length) + '.png'
        this.imgTransObj[obj] = tmpUrl
      }
      console.log(this.imgTransObj)
    },
    onClose() {
      this.visible = false;
      this.drawerData = null;
    },
  handleTableChange(pagination, filters={tags: []}) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        pageSize: pagination.pageSize,
        current: pagination.current,
      });
    },
    fetch(params = {}) {
      this.loading = true;
      personManageModel.getPersonList({
        role: 1,// 骑手
        operate: 0,
        pageSize: 10,
        current: 1,
        ...params,
      })
      .then(res => {
        const pagination = { ...this.pagination };
        if (res.result.success) {
          // Read total count from server
          pagination.total = res.result.data.total;
          this.loading = false;
          let dataList = [];
          // 参数处理
          res.result.data.data.map((obj, index) => {
            let tmp = {
              key: obj._id,
              name: obj.riderSignUpInfo.name,
              phone: obj._id,
              tags: obj.checked? ["已审核"] : ["未审核"],
              orginalObj: obj
            }
            dataList.push(tmp)
          })
          this.data = dataList;
        }
        else {
          this.loading = false;
          this.$message.error('查询失败');
        }
      })
    },
    // 操作栏
    confirm(record) {
      this.loading = true;
      personManageModel.approve({
        id: record.orginalObj._id,
        role: 1,// 0商家 1骑手
        checked: record.orginalObj.checked
      })
      .then(res => {
        if (res.result.success) {
          this.loading = false;
          this.fetch({});
          this.$message.success('操作成功');
        }
        else {
          this.loading = false;
          this.$message.error('操作失败');
        }
      })
    },
    cancel(e) {
    },
}
}

</script>
