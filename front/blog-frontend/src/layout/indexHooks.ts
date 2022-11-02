import { computed } from "@vue/reactivity";
import { useDark } from "@vueuse/core";
export const useChangeTheme = () => {
  const isDark = useDark();
  const isLight = computed({
    get() {
      return !isDark.value;
    },
    set(newValue) {
      isDark.value = !newValue;
    },
  });

  return {
    isLight,
  };
};
