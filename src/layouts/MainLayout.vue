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
    const router = useRouter();
    const auth = getAuth();
    const user = ref(auth.currentUser);
    const name = ref<string | null>(null);
    const profilePic = ref<string | null>(null);

    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          user.value = result.user;
          router.push('/home');
        })
        .catch((error) => {
          console.error('Error signing in with Google:', error);
        });
    };

    const isLoggedIn = ref(false);

    onMounted(() => {
      onAuthStateChanged(auth, (userData) => {
        user.value = userData;
        isLoggedIn.value = !!userData;

        if (userData) {
          name.value = userData.displayName || null;
          profilePic.value = userData.photoURL || null;
        } else {
          name.value = null;
          profilePic.value = null;
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        user.value = null;
        name.value = null;
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

    const isPaddingEnabled = ref(true);
    const togglePadding = () => {
      isPaddingEnabled.value = !isPaddingEnabled.value;
    };

    watch(percentages, () => {
      completionPercentage.value = calculateSum(percentages.value);
    });

    return {
      drawerLeft: ref(true),
      drawerRight: ref(false),
      isPaddingEnabled,
      percentages,
      calculateSum,
      completionPercentage,
      signInWithGoogle,
      handleSignOut,
      isLoggedIn,
      name,
      profilePic,
      togglePadding,
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
                  @click="(drawerLeft = !drawerLeft), togglePadding()"
                  round
                  dense
                  icon="menu"
                />
                <q-toolbar-title class="q-mr-xs">
                  A Simple Hollow Knight Tracker
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

            <q-footer class="bg-black">
              <div v-if="isLoggedIn" class="row">
                <q-space />
                <div class="row">
                  <div class="q-pt-lg q-pr-md">
                    <span> Currently logged in as {{ name }} </span>
                  </div>
                  <div class="q-pt-md q-pr-sm">
                    <q-avatar rounded size="40px">
                      <img :src="`${profilePic}`" />
                      <q-badge floating color="teal">!</q-badge>
                      <q-menu>
                        <q-list style="min-width: 75px">
                          <q-item
                            clickable
                            v-close-popup
                            @click="handleSignOut()"
                          >
                            <q-item-section>Sign Out</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-avatar>
                  </div>
                </div>
              </div>

              <div v-if="!isLoggedIn" class="row">
                <q-space />
                <div class="row">
                  <div class="q-pt-lg q-pr-md">
                    <span> Click the icon to the right to sign in </span>
                  </div>
                  <div class="q-pt-md q-pr-sm">
                    <q-avatar rounded size="40px">
                      <img src="avatar-signin.png" />
                      <q-badge floating color="teal">?</q-badge>
                      <q-menu>
                        <q-list style="min-width: 75px">
                          <q-item
                            clickable
                            v-close-popup
                            @click="signInWithGoogle()"
                          >
                            <q-item-section>Sign In</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-avatar>
                  </div>
                </div>
              </div>
            </q-footer>

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

            <q-page-container
              :class="{ 'component-padding': isPaddingEnabled }"
            >
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
