import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve-with-alias'
import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify';
import { join } from 'path'

const DIST_FOLDER = 'dist2'

process.env.BABEL_ENV = 'rollup'

export default {
    input: 'src/main.js',
    output: {
        file: `${DIST_FOLDER}/app.js`,
        format: 'iife'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': "'development'"
        }),
        alias({
            '@': join(__dirname, 'src')
        }),
        nodeResolve({
            jsnext: true,
            browser: true,
            extensions: [ '.js', '.json', '.vue' ],
            alias: {
                // vuetify
                '~components': 'vuetify/src/components',
                '~directives': 'vuetify/src/directives',
                '~mixins': 'vuetify/src/mixins',
                '~stylus': 'vuetify/src/stylus',
                '~util': 'vuetify/src/util'
            }
        }),
        vue({
            compileTemplate: true,
            css: `${DIST_FOLDER}/.tmp/app.css`
        }),
        babel({
            babelrc: false,
            presets: [
                ["env", {
                    modules: false,
                    targets: {
                        browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
                    }
                }],
                "stage-2"
            ]
        }),
        uglify()
    ],
    context: 'window'
}