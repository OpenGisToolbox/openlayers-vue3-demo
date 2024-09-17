import {createApp} from "vue";
import App from "./App.vue";

import OpenLayersMap from "vue3-openlayers";

const app = createApp(App);

app.use(OpenLayersMap);

app.mount("#app");