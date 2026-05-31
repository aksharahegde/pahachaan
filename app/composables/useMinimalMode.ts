export const useMinimalMode = () => {
  const config = useRuntimeConfig()
  return computed(() => config.public.minimalMode as boolean)
}
