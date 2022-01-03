<!--
 * @Author: your name
 * @Date: 2021-02-01 23:07:16
 * @LastEditTime: 2021-02-01 23:51:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-knowledge\src\views\communication\method1\index.vue
-->
<template>
  <div id="m1-father">
    <div>接收到来自子组件的数据： {{ childData }}</div>
    <child-1
      @getDataFromChild="handleData($event)"
      :incomingData="fatherData"
    ></child-1>
  </div>
</template>

<script>
import Child1 from "./child1.vue";
export default {
  name: "m1-father",
  components: {
    Child1,
  },
  data() {
    return {
      fatherData: "父组件的数据",
      childData: "",
    };
  },
  methods: {
    handleData(e) {
      this.childData = e;
    },
  },
};
</script>

<style></style>
