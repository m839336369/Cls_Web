<template>
  <q-expansion-item label="卡车" icon="img:/cls/卡车.svg">
    <q-infinite-scroll ref="truck_container" class="row q-gutter-sm">
      <ImageCard v-for="item in trucks" :key="item" v-bind:image="item" @deleteImage="deleteCard">
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="飞机" icon="img:/cls/飞机.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in planes"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="手机" icon="img:/cls/手机.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in mobiles"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="狗" icon="img:/cls/狗.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in dogs"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="猫" icon="img:/cls/猫.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in cats"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="船" icon="img:/cls/船.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in ships"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="青蛙" icon="img:/cls/青蛙.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in frogs"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="马" icon="img:/cls/马.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in horses"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="鸟" icon="img:/cls/鸟.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in birds"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
  <q-expansion-item label="鹿" icon="img:/cls/鹿.svg">
    <q-infinite-scroll class="row">
      <ImageCard
        v-for="item in deers"
        :key="item"
        v-bind:image="item"
        @deleteImage="deleteCard"
      >
      </ImageCard>
    </q-infinite-scroll>
  </q-expansion-item>
</template>
<script>
import ImageCard from "components/ImageCard.vue";
import axios from "axios";
import Api from "components/ApiComponent.vue";

export default {
  name: "ImagesPage",
  computed: {
  },
  components: { ImageCard},
  props: ["user_id"],
  data() {
    return {
      trucks: {},
      planes: {},
      mobiles: {},
      dogs: {},
      cats: {},
      ships: {},
      frogs: {},
      horses: {},
      birds: {},
      deers: {},
    };
  },
  methods: {
    deleteCard(image) {
      delete this.getClsImages(image.cls)[image.id];
    },
    getImages() {
      axios
        .get(Api.ApiList.Images, {
          params: {
            user_id: this.user_id,
          },
        })
        .then((res) => {
          let resJson = JSON.parse(JSON.stringify(res.data));
          if (resJson["code"] === 200) {
            for (const imageJson of resJson["data"]) {
              let image = {
                cls: imageJson["cls"],
                comment: imageJson["comment"],
                id: imageJson["id"],
                user_id: imageJson["user_id"],
                image: imageJson["image"],
              };
              this.getClsImages(image.cls)[image.id] = image;
            }
          }
        });
    },
    getClsImages(cls) {
      if (cls === "卡车") {
        return this.trucks;
      } else if (cls === "飞机") {
        return this.planes;
      } else if (cls === "狗") {
        return this.dogs;
      } else if (cls === "猫") {
        return this.cats;
      } else if (cls === "手机") {
        return this.mobiles;
      } else if (cls === "船") {
        return this.ships;
      } else if (cls === "青蛙") {
        return this.frogs;
      } else if (cls === "马") {
        return this.horses;
      } else if (cls === "鹿") {
        return this.deers;
      } else if (cls === "鸟") {
        return this.birds;
      }
    },
  },
  created() {
    this.getImages();
  },
};
</script>

<style scoped></style>
