<template>
  <div class="page">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        class="layout-sider"
        v-model="collapsed"
        :trigger="null"
        collapsible
      >
        <div class="logo">
          <img src="~@/assets/ganfanbao.png" alt="logo" />
        </div>
        <a-menu
          theme="dark"
          mode="inline"
          :default-selected-keys="['1']"
          @click="handleClick"
        >
          <!-- <a-menu-item key="1">
          <a-icon type="setting" />
          <span>平台管理</span>
        </a-menu-item> -->
          <a-sub-menu key="sub1">
            <span slot="title"
              ><a-icon type="setting" /><span>平台管理</span></span
            >
            <a-menu-item key="1"> 轮播图管理 </a-menu-item>
            <a-menu-item key="2"> 公告管理 </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="3">
            <a-icon type="shop" />
            <span>商家管理</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="team" />
            <span>骑手管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px 0', overflow: 'initial' }"
        >
          <div
            :style="{
              padding: '24px',
              background: '#fff',
            }"
          >
            <div v-if="key == 1">
              <a-breadcrumb>
                <a-breadcrumb-item>平台管理</a-breadcrumb-item>
                <a-breadcrumb-item>轮播图管理</a-breadcrumb-item>
              </a-breadcrumb>
              <swiper style="margin-top: 20px"></swiper>
              <a-button type="primary" loading> 更新上传 </a-button>
            </div>
            <div v-else-if="key == 2">
              <a-breadcrumb>
                <a-breadcrumb-item>平台管理</a-breadcrumb-item>
                <a-breadcrumb-item>公告管理</a-breadcrumb-item>
                <notice style="margin-top: 20px"></notice>
                <a-button class="submit" type="primary" loading>
                  更新上传
                </a-button>
              </a-breadcrumb>
            </div>
            <div v-else-if="key == 3">
              <a-breadcrumb>
                <a-breadcrumb-item>商家管理</a-breadcrumb-item>
              </a-breadcrumb>
              <merchant style="margin-top: 20px"></merchant>
            </div>
            <div v-else>
              <a-breadcrumb>
                <a-breadcrumb-item>骑手管理</a-breadcrumb-item>
              </a-breadcrumb>
              <rider style="margin-top: 20px"></rider>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import merchant from "./components/merchant";
import swiper from "./components/swiper";
import notice from "./components/notice";
import rider from "./components/rider";
export default {
  components: {
    merchant,
    swiper,
    notice,
    rider,
  },
  data() {
    return {
      collapsed: false,
      key: 1,
    };
  },
  methods: {
    handleClick(e) {
      console.log("click", e);
      this.key = e.key;
    },
  },
};
</script>
<style lang="less" scoped>
.page {
  height: 100%;
}
.ant-layout.ant-layout-has-sider {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  img {
    display: inline-block;
    height: 40px;
    width: 40px;
    margin-left: 5px;
  }
  span {
    color: #ffffff;
    font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 500;
    position: relative;
    top: 6px;
  }
}
.submit {
  display: inline-block;
  margin-top: 20px;
}
</style>
