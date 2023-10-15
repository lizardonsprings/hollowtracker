<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="content-wrapper">
    <div class="main-content">
      <div class="q-pl-xl q-pt-md text-h2">Please Sign In</div>
      <div class="text-h5 row">
        <div class="q-pl-lg q-pt-md text-h4">
          To use this app, you will need to sign in to Google via the avatar in
          the bottom right.
        </div>
        <div class="q-pl-lg text-h5 q-pt-lg">
          Once signed in, the app will track your progress throughout your run
          of Hollow Knight, progress will be linked to your Google account.
        </div>
        <div class="q-pt-xl q-pl-xl">
          <q-img class="bottom-fixed-image" src="unn.png" width="450px" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  min-height: 70vh;
}

.main-content {
  margin: 0;
}

.bottom-fixed-image {
  position: fixed;
  bottom: 0;
  left: 60%;
  transform: translateX(-50%);
}
</style>
