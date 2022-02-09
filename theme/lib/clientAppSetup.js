import { defineClientAppSetup } from '@vuepress/client';

export default defineClientAppSetup(() => {
    if (__VUEPRESS_SSR__)
        return;
   
});
