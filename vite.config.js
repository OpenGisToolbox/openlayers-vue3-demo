import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import base64 from 'base-64'

const AUTH = {user: "admin", pass: "geoserver"};
const AUTH_BASE64 = base64.encode(`${AUTH.user}:${AUTH.pass}`);

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/geoserver": {
                target: "http://127.0.0.1:8765/geoserver",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Basic ${AUTH_BASE64}`,
                },
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/geoserver/, ""),
            },
        },
    },
})
