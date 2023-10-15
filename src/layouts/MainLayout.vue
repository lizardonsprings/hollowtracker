<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { db } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Percentage } from 'src/models/Percentage';
import NavMenu from 'src/components/NavMenu.vue';

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
  components: { NavMenu },
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="bg-black">
        <div class="q-pa-lg row justify-center bg-black">
          <q-layout
            view="hHh lpR fFf"
            container
            style="height: 94vh; max-width: 1200px"
            class="shadow-2 bg-black mainborders"
          >
            <q-header class="bg-black">
              <q-toolbar>
                <q-btn
                  flat
                  @click="drawerLeft = !drawerLeft"
                  round
                  dense
                  icon="menu"
                />
                <q-toolbar-title class="q-mr-xs"
                  >A Simple Hollow Knight Tracker</q-toolbar-title
                >
                <h5 class="q-mb-md q-mt-xs">
                  <div class="q-pt-xs">
                    <span class="text-h6"
                      >Your overall progress is currently
                    </span>
                    <span class="text-h5"
                      >{{ completionPercentage }} out of 112%</span
                    >
                  </div>
                </h5>
                <q-img src="broken-vessel.png" width="70px" />
              </q-toolbar>
            </q-header>

            <q-drawer
              v-model="drawerLeft"
              :width="200"
              :breakpoint="700"
              class="grad text-white"
              overlay
              style="top: 0; bottom: 0; height: 100vh"
              persistent
            >
              <nav-menu />
            </q-drawer>

            <q-page-container class="">
              <q-page class="q-pa-md bg-grey-10 text-white mainborders">
                <div class="">
                  <router-view />
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
    </q-page-container>
  </q-layout>
</template>
