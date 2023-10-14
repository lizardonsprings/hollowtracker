<script lang="ts">
import { ref, onMounted } from 'vue';
import { db } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Charm } from 'src/models/Charms';

export default {
  setup() {
    const charms = ref<Charm[]>([]);
    let charmArray: Charm[] = [];

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'charms'));

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        // console.log(blogArray);

        const charms = {
          id: doc.id,
          info: doc.data().info,
          location: doc.data().location,
          name: doc.data().name,
          youtube: doc.data().youtube,
          is_complete: doc.data().is_complete,
        };

        charmArray.push(charms);
      });
      charms.value = charmArray;
      console.log(charmArray);
    });
    return {
      expanded: ref(false),
      charms,
    };
  },
};
</script>

<template>
  <div class="component-padding">
    <div class="row q-py-md row q-px-md">
      <div
        class="col row q-py-sm row q-px-sm"
        v-for="(charm, i) in charms"
        :key="i"
      >
        <q-card class="my-card bg-grey-9" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="charms/charms_wayward_compass.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ charm.name }}</div>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-card-section>
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
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subtitle2"> VIDEO </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
    </div>
  </div>
</template>
