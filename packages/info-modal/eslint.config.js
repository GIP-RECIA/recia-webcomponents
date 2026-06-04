import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  formatters: {
    css: true,
    html: true,
    prettierOptions: {
      singleAttributePerLine: true,
    },
  },
})
