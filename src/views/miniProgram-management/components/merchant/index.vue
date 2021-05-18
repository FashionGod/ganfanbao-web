<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange">
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> 商家名</span>
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="
          tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
        "
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action">
      <a>查看详情</a>
      <a-divider type="vertical" />
      <a>通过</a>
    </span>
  </a-table>
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
    filters: [
      { text: '未审核', value: '0' },
      { text: '审核通过', value: '1' },
    ],
    filterMultiple: false,
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    name: "必胜客",
    phone: "15541155173",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    phone: "15541155111",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    phone: "15541155112",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "必胜客",
    phone: "15541155173",
    tags: ["nice", "developer"],
  },
  {
    key: "5",
    name: "Jim Green",
    phone: "15541155111",
    tags: ["loser"],
  },
  {
    key: "6",
    name: "Joe Black",
    phone: "15541155112",
    tags: ["cool", "teacher"],
  },
  {
    key: "7",
    name: "必胜客",
    phone: "15541155173",
    tags: ["nice", "developer"],
  },
  {
    key: "8",
    name: "Jim Green",
    phone: "15541155111",
    tags: ["loser"],
  },
  {
    key: "9",
    name: "Joe Black",
    phone: "15541155112",
    tags: ["cool", "teacher"],
  },
  {
    key: "10",
    name: "必胜客",
    phone: "15541155173",
    tags: ["nice", "developer"],
  },
  {
    key: "11",
    name: "Jim Green",
    phone: "15541155111",
    tags: ["loser"],
  },
  {
    key: "12",
    name: "Joe Black",
    phone: "15541155112",
    tags: ["cool", "teacher"],
  },
  {
    key: "13",
    name: "必胜客",
    phone: "15541155173",
    tags: ["nice", "developer"],
  },
  {
    key: "14",
    name: "Jim Green",
    phone: "15541155111",
    tags: ["loser"],
  },
  {
    key: "15",
    name: "Joe Black",
    phone: "15541155112",
    tags: ["cool", "teacher"],
  },
];

import { PersonManageModel } from "../../../../models/personManage";
const personManageModel = new PersonManageModel();
export default {
  data() {
    return {
      data,
      columns,
      pagination: {},
      loading: false,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
  handleTableChange(pagination, filters={tags: []}) {
      console.log('pagination');
      console.log(pagination);
      console.log(filters);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        ...filters,
      });
    },
    fetch(params = {}) {
      console.log(params)
      if (params.tags) {
        console.log('有')
      }
      else {
        console.log('无')
      }
      this.loading = true;
      personManageModel.getPersonList({
        role: 0,
        operate: 0,
        results: 10,
        ...params,
      })
      .then(res => {
        const pagination = { ...this.pagination };
        console.log(res)
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.loading = false;
        this.data = data.results;
        this.pagination = pagination;
      })
      // queryData({ // Send request
      //   results: 10,
      //   ...params,
      // }).then(({ data }) => {
      //   const pagination = { ...this.pagination };
      //   // Read total count from server
      //   // pagination.total = data.totalCount;
      //   pagination.total = 200;
      //   this.loading = false;
      //   this.data = data.results;
      //   this.pagination = pagination;
      // });
    }
}
}

</script>
