import * as fsScandir from '@nodelib/fs.scandir';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';

const opts = {
  src: 'src',
  dist: 'dist',
  mainDirs: ['displays', 'interfaces', 'layouts', 'modules'],
  inputFile: 'index.js',
};

export default opts.mainDirs
  .map((dir) => {
    return fsScandir.scandirSync(`${opts.src}/${dir}`);
  })
  .flat()
  .reduce((acc, cur) => {
    return cur.dirent.isDirectory()
      ? [
          {
            input: `${cur.path}/${opts.inputFile}`,
            output: {
              format: 'es',
              file: `${cur.path.replace(`${opts.src}/`, `${opts.dist}/`)}/index.js`,
            },
            plugins: [vue(), nodeResolve(), commonjs(), terser()],
          },
          ...acc,
        ]
      : acc;
  }, []);
