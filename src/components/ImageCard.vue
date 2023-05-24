<script>
import axios from "axios";
import Api from "components/ApiComponent.vue";

export default {
  name: "ImageCard",
  props: {
    image: {
      id: String,
      image: Blob,
      cls: String,
      comment: Boolean,
    },
  },
  created() {
    this.image_boolean = this.image.comment;
  },
  data() {
    return {
      image_boolean: Boolean,
    };
  },
  computed: {
    ImageBoolean: {
      set(newValue) {
        const formData = {
          image_id: this.image.id,
          image_boolean: newValue,
        };
        axios
          .post(Api.ApiList.Comment, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            let repJson = JSON.parse(JSON.stringify(res.data));
            console.log(repJson);
            if (repJson["code"] === 200) {
              this.image_boolean = newValue;
            } else {
              this.$q.notify({
                type: "negative",
                message: "网络错误",
                timeout: 200,
              });
            }
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "网络错误",
              timeout: 200,
            });
          });
      },
      get() {
        return this.image_boolean;
      },
    },
  },
  methods: {
    deleteImage() {
      const formData = {
        image_id: this.image.id,
      };
      axios
        .put(Api.ApiList.DeleteImage, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          let repJson = JSON.parse(JSON.stringify(res.data));
          console.log(repJson);
          if (repJson["code"] === 200) {
            this.$emit("deleteImage", this.image);
            this.$q.notify({
              type: "positive",
              message: "删除成功",
              timeout: 200,
            });
          } else {
            this.$q.notify({
              type: "negative",
              message: "网络错误",
              timeout: 200,
            });
          }
        })
        .catch((reason) => {
          this.$q.notify({
            type: "negative",
            message: reason.message,
            timeout: 200,
          });
        });
    },
  },
};
</script>

<template>
  <q-intersection once class="example-item">
    <q-card class="image_card q-ma-sm" flat bordered>
      <q-img :src="this.image.image" />
      <q-card-actions style="height: 50px; justify-content: space-between">
        <q-checkbox v-model="ImageBoolean" flat round color="teal" />
        <q-btn flat round color="teal" icon="delete" @click="deleteImage" />
      </q-card-actions>
    </q-card>
  </q-intersection>
</template>

<style scoped>
.image_card {
  width: 256px;
}
</style>
