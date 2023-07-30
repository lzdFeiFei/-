<!--
 * @Author: your name
 * @Date: 2021-02-01 23:08:53
 * @LastEditTime: 2021-02-01 23:39:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-knowledge\src\views\communication\method1\child1.vue
-->
<template>
  <div id="m1-child1">
    <div>来自父组件的数据：{{ incomingData }}</div>
    <el-button @click="transformDataToFather()">向父组件传值</el-button>
  </div>
</template>

<script>
export default {
  name: "m1-child1",
  props: {
    incomingData: {
      type: String,
      default: "",
      required: true,
    },
  },
  data() {
    return {
      childData: "来自子组件的数据",
    };
  },
  methods: {
    transformDataToFather() {
      this.$emit("getDataFromChild", this.childData);
    },
  },
};
</script>

<style></style>
