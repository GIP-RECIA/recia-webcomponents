import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: {
    overrides: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: 1,
        },
      ],
    },
  },
  formatters: {
    css: true,
    html: true,
    prettierOptions: {
      singleAttributePerLine: true,
    },
  },
})
