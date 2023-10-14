<script lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { db } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Percentage } from 'src/models/Percentage';
import NavMenu from 'src/components/NavMenu.vue';
import CharmsPage from 'src/components/CharmsPage.vue';

export default {
  setup() {
    const percentages = ref<Percentage[]>([]);
    const completionPercentage = ref<number>(0);
    let answerArray: Percentage[] = [];

    onMounted(async () => {
      await fetchData(); // Initial data fetch
    });

    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'percentage'));

      querySnapshot.forEach((doc) => {
        const answer = {
          is_complete: doc.data().is_complete,
        };

        answerArray.push(answer);
      });

      percentages.value = answerArray;
    };

    const calculateSum = (percentages: Percentage[]): number => {
      return percentages.reduce(
        (acc, curr) => acc + (curr.is_complete ? 1 : 0),
        0
      );
    };

    watch(percentages, () => {
      // Update completionPercentage when percentages array changes
      completionPercentage.value = calculateSum(percentages.value);
    });

    return {
      drawerLeft: ref(true),
      drawerRight: ref(false),
      percentages,
      calculateSum,
      completionPercentage,
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
        style="height: 98vh; max-width: 1200px"
        class="shadow-2 bg-black mainborders"
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
            <h5>
              Your progress is currently {{ completionPercentage }}% out of 112%
            </h5>
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

        <q-page-container class="">
          <q-page class="q-pa-md bg-grey-10 text-white mainborders">
            <div class="">
              <charms-page />
              <q-page-sticky position="top" expand class="text-white">
                <q-scroll-area> </q-scroll-area>
              </q-page-sticky>
            </div>
          </q-page>

          <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>
        </q-page-container>
      </q-layout>
    </div>
  </q-page>
</template>
