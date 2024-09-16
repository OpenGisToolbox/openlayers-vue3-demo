<template>
  <Map.OlMap ref="mapRef" :controls="[]" style="height: 400px">
    <Map.OlView
        ref="view"
        :center="center"
        :projection="projection"
        :zoom="zoom"
    />

    <Layers.OlTileLayer ref="jawgLayer" title="JAWG">
      <Sources.OlSourceXyz
          crossOrigin="anonymous"
          url="https://c.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=87PWIbRaZAGNmYDjlYsLkeTVJpQeCfl2Y61mcHopxXqSdxXExoTLEv7dwqBwSWuJ"
      />
    </Layers.OlTileLayer>

    <Layers.OlLayerGroup ref="layerGroup" title="Stadia Maps">
      <Layers.OlTileLayer title="Stamen Watercolor">
        <Sources.OlSourceStadiaMaps layer="stamen_watercolor"/>
      </Layers.OlTileLayer>
      <Layers.OlTileLayer title="Stamen Terrain Labels">
        <Sources.OlSourceStadiaMaps layer="stamen_terrain_labels"/>
      </Layers.OlTileLayer>
    </Layers.OlLayerGroup>

    <Layers.OlTileLayer title="OSM">
      <Sources.OlSourceOsm/>
    </Layers.OlTileLayer>

    <MapControls.OlLayerswitcherControl v-if="layerList.length > 0"/>
  </Map.OlMap>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import type MapRef from "ol/Map";
import {Layers, Map, MapControls, Sources,} from "vue3-openlayers";

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const layerList = ref([]);
const jawgLayer = ref(null);
const layerGroup = ref(null);
const mapRef = ref<MapRef | null>(null);

onMounted(() => {
  layerList.value.push(jawgLayer.value.tileLayer);
  layerList.value.push(layerGroup.value.layerGroup);
});

onMounted(() => {
  console.log(mapRef.value);
});
</script>