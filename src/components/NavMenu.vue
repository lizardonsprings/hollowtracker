<template>
  <div class="q-pa-sm">
    <q-list>
      <router-link to="/">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar square>
              <img src="elderbug.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/charms">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar square>
              <img src="charms/charms_carefree_melody.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>Charms</q-item-section>
        </q-item>
      </router-link>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="mask-shard.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Mask Shards</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="vessel-fragment.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Vessel Fragments</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="bosses/boss_crystal_guardian.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Bosses</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="dreamers/dream_boss_marmu.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Dreamers</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="nailsmith.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Nail Upgrades</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="seer.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Dream Nail</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="nailmaster-sheo.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Nail Arts</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="monarch-wings.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Equipment</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="howling-wraiths.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Spells</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="zote.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Colosseum</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="godseeker.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>Godhome</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
