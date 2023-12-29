export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const resp: any = await $fetch(
    `https://api.openstatus.dev/public/status/${config.public.statusSiteSlug}`
  );
  return resp;
});
