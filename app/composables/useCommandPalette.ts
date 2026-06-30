export const useCommandPalette = () => {
  const isCommandPaletteOpen = useState("command-palette-open", () => false);

  const openCommandPalette = () => {
    isCommandPaletteOpen.value = true;
  };

  const closeCommandPalette = () => {
    isCommandPaletteOpen.value = false;
  };

  const toggleCommandPalette = () => {
    isCommandPaletteOpen.value = !isCommandPaletteOpen.value;
  };

  return {
    isCommandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
    toggleCommandPalette,
  };
};
