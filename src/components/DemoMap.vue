<template>
  <Map.OlMap id="map" ref="mapRef" :controls="[]">
    <Map.OlView
        ref="view"
        :center="center"
        :projection="projection"
        :zoom="zoom"
    />

    <Layers.OlLayerGroup v-for="group in dynamicLayerGroupList" :key="group.name" :title="group.name">
      <Layers.OlTileLayer v-for="layer in group.layers" :key="layer.name" :title="layer.name">
        <Sources.OlSourceTileWms :layers="layer.name" :url="layer.url" serverType="geoserver"/>
      </Layers.OlTileLayer>
    </Layers.OlLayerGroup>

    <Layers.OlTileLayer v-for="layer in dynamicLayerList" :key="layer.name" :title="layer.name">
      <Sources.OlSourceTileWms :layers="layer.name" :url="layer.url" serverType="geoserver"/>
    </Layers.OlTileLayer>

    <MapControls.OlLayerswitcherControl/>

  </Map.OlMap>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import type MapRef from "ol/Map";
import {Layers, Map, MapControls, Sources} from "vue3-openlayers";
import GeoServerRestApi from '../geoserver/GeoServerRestApi';

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const dynamicLayerList = ref([]);
const dynamicLayerGroupList = ref([]);
const mapRef = ref<MapRef | null>(null);

onMounted(async () => {
  try {
    let geoServerRestApi = new GeoServerRestApi();
    let groups = await geoServerRestApi.layers.getLayerGroups();
    for (let group of groups.layerGroups.layerGroup) {
      let groupName = group.name;
      let groupLayers = await geoServerRestApi.layers.getLayerGroup(groupName);
      let layerGroups = {
        name: groupName,
        layers: [],
      };
      groupLayers.layerGroup.publishables.published.forEach((layer: any) => {
        if (layer["@type"] !== "layer") return;

        layerGroups.layers.push({
          name: layer.name,
          url: `/geoserver/wms`,
        });
      });
      dynamicLayerGroupList.value.push(layerGroups);
    }

    let layers = await geoServerRestApi.layers.getLayers();
    let layerList = layers.layers.layer;
    layerList.forEach((layer: any) => {
      let layerName = layer.name;
      dynamicLayerList.value.push({
        name: layerName,
        url: `/geoserver/wms`,
      });
    });
  } catch (error) {
    console.error("Failed to load layers:", error);
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>