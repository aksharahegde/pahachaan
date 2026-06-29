import { initAblyVisitors, shutdownAblyVisitors } from "~/composables/useAblyVisitors";

export default defineNuxtPlugin(() => {
  onNuxtReady(() => {
    initAblyVisitors();
  });

  window.addEventListener("beforeunload", () => {
    void shutdownAblyVisitors();
  });
});
