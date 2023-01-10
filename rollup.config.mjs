import {babel} from "@rollup/plugin-babel";
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import del from "rollup-plugin-delete";

export default [{
    input: 'src/index.js',
    output: [
        {
            file: 'dist/d-vue-localization.umd.min.js',
            format: 'umd',
            name: 'd-vue-localization',
            globals: {
                net: "net"
            }
        },
        {
            file: 'dist/d-vue-localization.cjs.min.js',
            format: 'cjs',
            name: 'd-vue-localization'
        },
        {
            file: 'dist/d-vue-localization.esm.min.js',
            format: 'esm',
            name: 'd-vue-localization'
        }
    ],
    plugins: [
        del({targets: "dist/*"}),
        nodeResolve(),
        babel({
            babelrc: false,
            exclude: "**/node_modules/**",
            presets: [
                "@babel/preset-env"
            ],
            plugins: [
                "@babel/plugin-transform-runtime",
            ],
            babelHelpers: "runtime"
        }),
        commonjs(),
        terser()
    ],
}];