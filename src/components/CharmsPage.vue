<script lang="ts">
import { ref, onMounted } from 'vue';
import { db } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Charm } from 'src/models/Charms';

export default {
  setup() {
    const charms = ref<Charm[]>([]);
    let charmArray: Charm[] = [];
    const expandedArray = ref<boolean[][]>([]);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'charms'));

      querySnapshot.forEach((doc) => {
        const charm = {
          id: doc.id,
          name: doc.data().name,
          info: doc.data().info,
          location: doc.data().location,
          image: doc.data().image,
          youtube: doc.data().youtube,
          is_complete: doc.data().is_complete,
        };

        charmArray.push(charm);
        expandedArray.value.push([false, false]);
      });

      charms.value = charmArray;
    });

    return {
      expandedArray,
      charms,
    };
  },
  computed: {
    charmPairs() {
      const pairs = [];
      for (let i = 0; i < this.charms.length; i += 2) {
        const pair = [];
        if (this.charms[i]) pair.push(this.charms[i]);
        if (this.charms[i + 1]) pair.push(this.charms[i + 1]);
        pairs.push(pair);
      }
      return pairs;
    },
  },
};
</script>

<template>
  <div class="component-padding">
    <div class="row q-py-md row q-px-md">
      <div class="col row q-py-sm row q-px-sm">
        <div
          v-for="(pair, rowIndex) in charmPairs"
          :key="rowIndex"
          class="row q-mb-md"
        >
          <div
            v-for="(charm, colIndex) in pair"
            :key="colIndex"
            class="col-6 q-pa-sm"
          >
            <q-card class="my-card bg-grey-9" flat bordered>
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="`${charm.image}`" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ charm.name }}</div>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-card-section style="height: 110px">
                {{ charm.info }}
              </q-card-section>

              <q-separator />

              <q-card-section> {{ charm.location }} </q-card-section>

              <q-card-actions>
                <q-btn flat round icon="close" color="red" />
                <q-btn flat color="primary" label="Mark as completed" />
                <q-space />

                <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="
                    expandedArray[rowIndex][colIndex]
                      ? 'keyboard_arrow_up'
                      : 'keyboard_arrow_down'
                  "
                  @click="
                    expandedArray[rowIndex][colIndex] =
                      !expandedArray[rowIndex][colIndex]
                  "
                />
              </q-card-actions>

              <q-slide-transition>
                <div v-show="expandedArray[rowIndex][colIndex]">
                  <q-separator />
                  <q-card-section class="text-subtitle2">
                    VIDEO
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
