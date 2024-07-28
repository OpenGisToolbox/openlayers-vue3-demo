<script setup>
import {onMounted, ref} from 'vue'
import GeoServerRestApi from "../geoserver/GeoServerRestApi.js";

let manifest = ref(null);
let status = ref(null);
let system_status = ref(null);
let version = ref(null);

let layers = ref(null);

onMounted(async () => {
  let g = new GeoServerRestApi();

  layers.value = await g.layers.getLayers();

  [manifest.value,
    status.value,
    system_status.value,
    version.value] = await Promise.all([g.about.getManifest(),
    g.about.getStatus(),
    g.about.getSystemStatus(),
    g.about.getVersion()]);
});

</script>

<template>
  <h1>GeoServer</h1>
  <div>
    <h2>Layers</h2>
    <div>{{ layers }}</div>
  </div>
  <div class="read-the-docs">
    <h2>Manifest</h2>
    <pre>{{ manifest }}</pre>
    <h2>Status</h2>
    <pre>{{ status }}</pre>
    <h2>System Status</h2>
    <pre>{{ system_status }}</pre>
    <h2>Version</h2>
    <p>{{ version }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
