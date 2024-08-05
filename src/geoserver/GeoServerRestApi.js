import About from './About.js'
import Layers from "./Layers.js";

export default class GeoServerRestApi {
    /**
     * Represents information about the GeoServer.
     * @type {any}
     */
    about;
    /**
     * Represents the layers in the GeoServer.
     * @type {any}
     */
    layers;

    constructor() {
        this.about = new About();
        this.layers = new Layers();
    }
}