<template>
  <q-page class="uploader_page">
    <div class="uploadComponent">
      <div class="circle" ref="circle" @click="load">
        <i class="icon-image"></i>
      </div>
      <q-uploader
        class="upload"
        ref="uploader"
        @added="upload"
        :auto-upload="false"
      />
    </div>
  </q-page>
</template>

<script>
import { QSpinnerGears, QUploader } from "quasar";
import axios from "axios";
import Api from "components/ApiComponent.vue";

export default {
  name: "UploaderPage",
  components: {
    QUploader,
  },
  props: ["user_id"],
  methods: {
    load() {
      this.$refs.circle.style.transform = "scale(1.2)";
      setTimeout(() => {
        this.$refs.circle.style.transform = "scale(1)";
      }, 200);
      this.$refs.uploader.pickFiles();
    },
    upload(files) {
      this.$q.notify({
        spinner: QSpinnerGears,
        message: `Working...`,
        position: "bottom-right",
        timeout: 500,
      });
      const reader = new FileReader();
      reader.onload = (file) => {
        const formData = new FormData();
        formData.append("user_id", this.user_id);
        formData.append("file", file.target.result);
        axios
          .post(Api.ApiList.CLS, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            let repJson = JSON.parse(JSON.stringify(response.data));
            if (repJson["code"] === 200) {
              let imageJson = repJson["data"];
              let image = {
                cls: imageJson["cls"],
                comment: imageJson["comment"],
                id: imageJson["id"],
                user_id: imageJson["user_id"],
                image: imageJson["image"],
              };
              this.$q.notify({
                type: "positive",
                message: `识别成功：${image.cls}`,
                position: "bottom-right",
              });
              this.$emit("upload", image);
            } else {
              this.$q.notify({
                type: "negative",
                message: repJson["data"],
                duration: 3000,
              });
            }
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "上传失败",
              duration: 3000,
            });
          })
          .finally(() => {
            this.$refs.uploader.reset();
          });
      };
      reader.readAsDataURL(files[0]);
    },
  },
};
</script>

<style scoped>
.uploader_page {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly; /* 主轴上靠右对齐 */
  flex-direction: row;
  align-items: center; /* 垂直居中对齐 */
}

.uploadComponent {
  width: 250px;
  height: 250px;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(143, 188, 143, 0.5);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  box-shadow: 0 0 50px seagreen;
  transition: transform 0.2s ease-out, background-color 0.5s;
  z-index: 1;
}

.upload {
  position: relative;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
}

.icon-image {
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("../assets/upload.svg");
  z-index: 2;
}

.result {
  text-align: center;
  margin-bottom: 15px;
  vertical-align: middle;
  font-size: 2em;
  font-weight: bold;
  z-index: 3;
  position: relative;
}
</style>
