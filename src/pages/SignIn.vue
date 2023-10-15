<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <div>
    <div class="">
      <div class="q-pl-lg q-pt-md text-h2">Please Sign In</div>
      <div class="q-pl-lg q-pt-md text-h5 row">
        <div class="text-h4">
          To use this app, you will need to sign in to Google via the avatar in
          the bottom right.
        </div>
        <div class="text-h5 q-pt-lg">
          Once signed in, the app will track your progress throughout your run
          of Hollow Knight, progress will be linked to your Google account.
        </div>
        <div class="row">
          <div class="col-6"></div>
          <div class="q-pt-xl col-6">
            <q-img class="" src="signin-lemm.png" width="600px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
