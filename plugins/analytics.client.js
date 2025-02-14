import { OpenPanel } from "@openpanel/web";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  console.log(config.public.analyticsClientId);
  nuxtApp.vueApp.use(
    new OpenPanel({
      clientId: config.public.analyticsClientId,
      trackScreenViews: true,
    })
  );
});
