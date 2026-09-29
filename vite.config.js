import { defineConfig } from 'vite';

const previewAllowedHost = process.env.VITE_PREVIEW_ALLOWED_HOST;

export default defineConfig({
  preview: {
    allowedHosts: previewAllowedHost ? [previewAllowedHost] : [],
  },
});
