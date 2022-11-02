import { computed } from '@vue/reactivity'
import { useDark } from '@vueuse/core'
import { useThemeStore } from '@/store/themeConfig/index'
import { watch } from 'vue'
export const useChangeTheme = () => {
  const isDark = useDark()
  const themeStore = useThemeStore()
  const isLight = computed({
    get() {
      return !isDark.value
    },
    set(newValue) {
      isDark.value = !newValue
    }
  })
  /**
   * 将主题信息存储到store
   * 供其他模块使用
   */
  watch(isLight, (newValue) => {
    themeStore.changeStatus(newValue as boolean)
  })
  return {
    isLight
  }
}
