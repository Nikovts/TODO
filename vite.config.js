import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVue3Resolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
      '@' : './src'
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
            RENDER_FUNCTION: false,
            WATCH_ARRAY: false,
            COMPONENT_V_MODEL: false,
            ATTR_FALSE_VALUE: false
          }
        }
      }
    }),
    Components({
      resolvers: [BootstrapVue3Resolver()]
    })
  ],
});
