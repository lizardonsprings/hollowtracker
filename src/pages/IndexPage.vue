<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    return {
      drawerLeft: ref(true),
      drawerRight: ref(false),
    };
  },
};
</script>

<template>
  <q-page class="bg-black">
    <div class="q-pa-lg row justify-center">
      <q-layout
        view="hHh lpR fFf"
        container
        style="height: 92vh; max-width: 1200px"
        class="shadow-2 rounded-borders bg-grey-10"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-header reveal :class="$q.dark.isActive ? 'bg-green' : 'bg-black'">
          <q-toolbar>
            <q-btn
              flat
              @click="drawerLeft = !drawerLeft"
              round
              dense
              icon="menu"
            />
            <q-toolbar-title>A Hollow Knight Tracker</q-toolbar-title>
            <p>27 / 112% Complete</p>
          </q-toolbar>
        </q-header>

        <q-footer reveal :class="$q.dark.isActive ? 'bg-green' : 'bg-black'">
          <q-toolbar>
            <q-toolbar-title>Footer</q-toolbar-title>
          </q-toolbar>
        </q-footer>

        <q-drawer v-model="drawerLeft" :width="200" :breakpoint="700">
          <q-scroll-area class="fit bg-grey-10 text-white">
            <div class="q-pa-sm">NAV</div>
          </q-scroll-area>
        </q-drawer>

        <q-page-container>
          <q-page class="q-pa-md bg-grey-10 text-white">
            CONTENT
            <q-page-sticky position="top" expand class="bg-primary text-white">
            </q-page-sticky>
          </q-page>

          <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>
        </q-page-container>
      </q-layout>
    </div>
  </q-page>
</template>
