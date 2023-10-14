<script lang="ts">
import { ref } from 'vue';
import NavMenu from 'src/components/NavMenu.vue';
import CharmsPage from 'src/components/CharmsPage.vue';

export default {
  setup() {
    return {
      percentage: 0,
      drawerLeft: ref(true),
      drawerRight: ref(false),
    };
  },
  components: { NavMenu, CharmsPage },
};
</script>

<template>
  <q-page class="bg-black">
    <div class="q-pa-lg row justify-center bg-black">
      <q-layout
        view="hHh lpR fFf"
        container
        style="height: 94vh; max-width: 1200px"
        class="shadow-2 bg-black"
      >
        <q-header reveal class="bg-black">
          <q-toolbar>
            <q-btn
              flat
              @click="drawerLeft = !drawerLeft"
              round
              dense
              icon="menu"
            />
            <q-toolbar-title>A Simple Hollow Knight Tracker</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-footer reveal class="bg-black">
          <q-toolbar>
            <q-toolbar-title></q-toolbar-title>
            <h5>You are currently {{ percentage }}% out of 112% Complete</h5>
            <q-img src="broken-vessel.png" width="80px" />
          </q-toolbar>
        </q-footer>

        <q-drawer
          v-model="drawerLeft"
          :width="200"
          :breakpoint="700"
          class="grad text-white"
          overlay
          style="top: 0; bottom: 0; height: 100vh"
        >
          <nav-menu />
        </q-drawer>

        <q-page-container>
          <q-page class="q-pa-md bg-grey-10 text-white mainborders">
            <charms-page />
            <q-page-sticky position="top" expand class="text-white">
              <q-scroll-area> </q-scroll-area>
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
