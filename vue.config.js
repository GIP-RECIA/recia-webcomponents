module.exports = {
    assetsDir: 'vue-ui/',
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: '[name]-[local]',
                },
                localsConvention: 'camelCaseOnly',
            },
        },
    }
}
