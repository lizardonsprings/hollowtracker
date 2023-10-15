<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { db } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'vue-router';
import { Percentage } from 'src/models/Percentage';
import NavMenu from 'src/components/NavMenu.vue';

export default {
  setup() {
    let user = getAuth().currentUser;
    let name;

    if (user != null) {
      name = user.displayName;
    }

    const router = useRouter();
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          router.push('/home');
        })
        .catch((result) => {
          // error handling
        });
    };

    const isLoggedIn = ref(false);
    let auth: any;

    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLoggedIn.value = true;
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        router.push('/');
      });
    };

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
      completionPercentage.value = calculateSum(percentages.value);
    });

    return {
      drawerLeft: ref(true),
      drawerRight: ref(false),
      percentages,
      calculateSum,
      completionPercentage,
      signInWithGoogle,
      handleSignOut,
      isLoggedIn,
      name,
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
                <q-toolbar-title class="q-mr-xs">
                  <q-btn
                    v-if="!isLoggedIn"
                    flat
                    class="text-h5"
                    @click="signInWithGoogle()"
                    >Sign In
                  </q-btn>
                  <div v-if="isLoggedIn" class="row">
                    <span class="q-pt-sm">
                      Currently logged in as {{ name }}</span
                    >
                    <q-btn flat class="text-h6" @click="handleSignOut()"
                      >Sign Out</q-btn
                    >
                  </div>
                </q-toolbar-title>
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
                <q-img src="broken-vessel.png" width="60px" />
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
