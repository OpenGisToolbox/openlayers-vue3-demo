import axios from "axios";

export default class About {
    async getManifest() {
        try {
            const response = await axios.get('/geoserver/rest/about/manifest');
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(JSON.stringify(response));
            }
        } catch (error) {
            throw error;
        }
    }

    async getStatus() {
        try {
            const response = await axios.get('/geoserver/rest/about/status');
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(JSON.stringify(response));
            }
        } catch (error) {
            throw error;
        }
    };

    async getSystemStatus() {
        try {
            const response = await axios.get('/geoserver/rest/about/system-status');
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(JSON.stringify(response));
            }
        } catch (error) {
            throw error;
        }
    };

    async getVersion() {
        try {
            const response = await axios.get('/geoserver/rest/about/version');
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