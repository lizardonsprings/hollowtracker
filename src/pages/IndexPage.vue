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
};
</script>

<template>
  <div class="component-padding">
    <div class="">
      <div class="q-pl-lg q-pt-md text-h2">Overview</div>
      <div class="row q-pl-lg q-pt-xl">
        <div class="col-4">
          <q-img src="charms/charms_lifeblood_heart.png" width="50px " />
          <span class="q-pl-lg text-h4">Charms</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 40%</div>
        <div class="col-4 q-pl-lg">
          <q-img src="mask-shard.png" width="50px " />
          <span class="q-pl-lg text-h4">Mask Shards</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 4%</div>
      </div>
      <div class="row q-pl-lg q-pt-xl">
        <div class="col-4">
          <q-img src="vessel-fragment.png" width="50px " />
          <span class="q-pl-lg text-h4">Vessels</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 3%</div>
        <div class="col-4 q-pl-lg">
          <q-img src="bosses/boss_crystal_guardian.png" width="50px " />
          <span class="q-pl-lg text-h4">Bosses</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 16%</div>
      </div>
      <div class="row q-pl-lg q-pt-xl">
        <div class="col-4">
          <q-img src="dreamers/dream_boss_marmu.png" width="50px " />
          <span class="q-pl-lg text-h4">Dreamers</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 11%</div>
        <div class="col-4 q-pl-lg">
          <q-img src="nailsmith.png" width="50px " />
          <span class="q-pl-lg text-h4">Nail Upgrade</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 4%</div>
      </div>
      <div class="row q-pl-lg q-pt-xl">
        <div class="col-4">
          <q-img src="seer.png" width="50px " />
          <span class="q-pl-lg text-h4">Dream Nail</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 3%</div>
        <div class="col-4 q-pl-lg">
          <q-img src="nailmaster-sheo.png" width="50px " />
          <span class="q-pl-lg text-h4">Nail Art</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 3%</div>
      </div>
      <div class="row q-pl-lg q-pt-xl">
        <div class="col-4">
          <q-img src="monarch-wings.png" width="50px " />
          <span class="q-pl-lg text-h4">Equipment</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 14%</div>
        <div class="col-4 q-pl-lg">
          <q-img src="howling-wraiths.png" width="50px " />
          <span class="q-pl-lg text-h4">Spells</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 6%</div>
      </div>
      <div class="row q-pl-lg q-pt-xl">
        <div class="col-4">
          <q-img src="zote.png" width="50px " />
          <span class="q-pl-lg text-h4">Colosseum</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 3%</div>
        <div class="col-4 q-pl-lg">
          <q-img src="godseeker.png" width="50px " />
          <span class="q-pl-lg text-h4">Godhome</span>
        </div>
        <div class="col-2 text-h3"><span class="text-h4">0 </span>/ 5%</div>
      </div>
    </div>
  </div>
</template>
