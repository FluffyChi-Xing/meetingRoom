import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  //当前用户权限
  const currentPermission = ref('false')

  return { count, doubleCount, currentPermission }
})
