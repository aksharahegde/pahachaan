import { Openpanel } from "@openpanel/web";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  console.log(config.public.analyticsClientId);
  nuxtApp.vueApp.use(
    new Openpanel({
      clientId: config.public.analyticsClientId,
      trackScreenViews: true,
    })
  );
});
