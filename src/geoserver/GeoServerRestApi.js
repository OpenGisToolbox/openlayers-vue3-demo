import About from './About.js'
import Layers from "./Layers.js";

export default class GeoServerRestApi {
    constructor() {
        this.about = new About();
        this.layers = new Layers();
    }
}