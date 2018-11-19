SystemJS.config({
    transpiler: false,
    packages: {
        "vue-property-decorator": {
            defaultExtension: 'js',
            main: "lib/vue-property-decorator.umd.js"
        }
    },
    meta: {
        '*.html': {
            loader: 'text'
        }
    },
    map: {
        "text": "node_modules/systemjs-plugin-text/text.js",
        "vue-property-decorator": "node_modules/vue-property-decorator/",
        "vue-class-component": "node_modules/vue-class-component/dist/vue-class-component.common.js",
        "reflect-metadata": "node_modules/reflect-metadata/Reflect.js"
    }
});
