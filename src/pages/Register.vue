<template>
  <q-page class="register_page">
    <div>
      <img class="logo" src="../assets/logo.svg" alt="null image" />
    </div>
    <div class="form">
      <h2>Please register</h2>
      <q-input
        filled
        type="text"
        id="username"
        name="username"
        label="Username"
        v-model="username"
      />
      <q-input
        filled
        fill-mask
        type="password"
        id="password"
        name="password"
        label="Password"
        v-model="password"
      />
      <q-btn color="secondary" text-color="primary" @click="doRegister"
        >Register</q-btn
      >
      <q-btn color="secondary" text-color="primary" @click="toLogin"
        >Already have account?</q-btn
      >
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import Api from "components/ApiComponent.vue";

export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  props: ["login_username"],
  created() {
    this.username = this.login_username;
  },
  methods: {
    toLogin() {
      this.$router.push(`/user/login/${this.username}`); // 获取当前 URL 的路径
    },
    doRegister() {
      // 构造表单数据对象
      const formData = {
        username: this.username,
        password: this.password,
        // 其他表单字段的值
      };
      axios
        .postForm(Api.ApiList.Register, formData)
        .then((res) => {
          this.$q.notify({
            type: "positive",
            message: "注册成功",
            duration: 3000,
          });
          this.toLogin();
        })
        .catch((res) => {
          this.$q.notify({
            type: "negative",
            message: "注册失败",
            duration: 3000,
          });
        });
    },
  },
};
</script>

<style scoped>
.register_page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly; /* 主轴上靠右对齐 */
  flex-direction: row;
  align-items: center; /* 垂直居中对齐 */
}

.form {
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logo {
  width: 256px;
  height: 256px;
}
</style>
