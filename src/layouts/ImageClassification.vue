<template>
  <q-layout class="images_layout" view="hHr lpR fFr">
    <q-drawer
      v-model="drawer"
      show-if-above
      side="right"
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :breakpoint="500"
      :width="570"
      bordered
      elevated
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <ImagesPage ref="imagesPage" :user_id="user_id" />
      <!--
        in this case, we use a button (can be anything)
        so that user can switch back
        to mini-mode
      -->
      <div class="q-mini-drawer-hide absolute" style="top: 15px; left: -17px">
        <q-btn
          dense
          round
          color="primary"
          icon="chevron_right"
          @click="miniState = true"
        />
      </div>
    </q-drawer>
    <q-page-container>
      <UploaderPage :user_id="user_id" @upload="upload"> </UploaderPage>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import UploaderPage from "pages/Uploader.vue";
import ImagesPage from "pages/Images.vue";

export default {
  name: "ImageClassificationLayout",
  components: { ImagesPage, UploaderPage },
  props: {
    user_id: String,
  },
  methods: {
    upload(image) {
      this.$refs.imagesPage.getClsImages(image.cls)[image.id] = image;
    },
  },
  setup() {
    const miniState = ref(true);
    return {
      drawer: ref(true),
      miniState,
      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;
          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
};
</script>

<style scoped>
.images_layout {
  background: url("../assets/background.jpg");
}
</style>
