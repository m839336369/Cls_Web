<template>
  <q-page class="login_page">
    <div>
      <img class="logo" src="../assets/logo.svg" alt="null image" />
    </div>
    <div class="form">
      <h2>Please sign in</h2>
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
      <q-btn color="secondary" text-color="primary" @click="handleSubmit"
        >Login
      </q-btn>
      <q-btn color="secondary" text-color="primary" @click="toRegister"
        >No Account?
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import Api from "components/ApiComponent.vue";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  props: ["register_username"],
  created() {
    this.username = this.register_username;
  },
  methods: {
    toRegister() {
      this.$router.push(`/user/register/${this.username}`); // 获取当前 URL 的路径
    },
    handleSubmit() {
      // 构造表单数据对象
      const formData = {
        username: this.username,
        password: this.password,
        // 其他表单字段的值
      };
      axios
        .post(Api.ApiList.Login, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$q.notify({
            type: "positive",
            message: "登陆成功",
            timeout: 200,
          });
          let repJson = JSON.parse(JSON.stringify(response.data));
          if (repJson["code"] === 200) {
            let id = repJson["data"];
            this.$router.push(`/image/${id}`);
          }
        })
        .catch((response) => {
          this.$q.notify({
            type: "negative",
            message: "登录失败",
          });
        });
    },
  },
};
</script>

<style scoped>
.login_page {
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
