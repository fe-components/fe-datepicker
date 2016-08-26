import fs from 'fs'
import path from 'path'
const base = path.join(__dirname, '..')
const pkg = `${base}/package.json`
const src = `${base}/src`
const dist = `${base}/lib`
const modules = `${base}/node_modules`

let lint = [
  `${base}/src/**/*.js`,
  `${base}/webpack/**/*.js`
]

// Read ignore lint config from package.json
try {
  let ignore = require(pkg).standard.ignore
  ignore.map((item) => lint.push(`!${base}/${item}`))
} catch (e) {}

let internalModules = fs.readdirSync(modules)
  .filter(folder => !!~folder.indexOf('fe-'))
  .map(folder => `${modules}/${folder}`)

export default {
  base,
  pkg,
  src,
  dist,
  lint,
  webpack: `${base}/webpack`,
  node_modules: modules,
  src_path: internalModules.concat(src)
}
