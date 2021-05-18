<template>
<div class="page">
    
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider class="layout-sider" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="~@/assets/ganfanbao.png" alt="logo" />
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>平台管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>商家管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
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
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
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
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 500;
    position: relative;
    top: 6px;
  }
}
</style>
