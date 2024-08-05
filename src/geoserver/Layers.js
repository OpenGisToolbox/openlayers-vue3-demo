import axios from "axios";

export default class Layers {
    async getLayers() {
        try {
            const response = await axios.get('/geoserver/rest/layers');
            if (response.status === 200) {
                return response.data;
            } else {
                console.err(JSON.stringify(response));
            }
        } catch (error) {
            console.err(error);
            throw error;
        }
    };
}