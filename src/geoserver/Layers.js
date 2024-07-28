import axios from "axios";

export default class Layers {
    async getLayers() {
        try {
            const response = await axios.get('/geoserver/rest/layers');
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(JSON.stringify(response));
            }
        } catch (error) {
            throw error;
        }
    };
}