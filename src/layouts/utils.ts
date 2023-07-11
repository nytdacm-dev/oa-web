import { h } from 'vue'
import { RouterLink } from 'vue-router'

export const renderMenuLabel = (option: { key: string;label: string;path: string }) => {
  return h(
    RouterLink,
    {
      to: option.path,
    },
    { default: () => option.label },
  )
}
