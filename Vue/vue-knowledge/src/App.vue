<!--
 * @Author: your name
 * @Date: 2021-02-01 22:48:18
 * @LastEditTime: 2021-02-01 23:42:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-knowledge\src\App.vue
-->
<template>
  <div id="app">
    <router-link to="/communication">跨级通信</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
