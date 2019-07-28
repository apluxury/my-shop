<template>
  <div class="login_container">
    <div class="login_box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.login_container {
  background-color: pink;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
}
</style>