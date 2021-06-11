import { join } from 'path'
import { promises as fs } from 'fs'
import Maizzle from '@maizzle/framework'
import Mustache from 'mustache'
import { tailwindConfig } from './tailwind.config.mjs'
import { config } from './config.mjs'

const { mkdir, readFile, writeFile } = fs
const { render } = Mustache

const SRC_DIR = 'src'
const DIST_DIR = 'dist'

;(async () => {
  // Maizzleファイルの読み込み
  const maizzle = await readFile(join(SRC_DIR, 'index.html'), 'utf-8')
  const css = await readFile(join(SRC_DIR, 'index.css'), 'utf-8')

  // template を生成
  const { html: template } = await Maizzle.render(maizzle, {
    tailwind: {
      config: tailwindConfig,
      css,
    },
    maizzle: config
  })

  // html を生成
  const html = render(template, { name: 'Higa' })

  // html を表示
  console.log(html)

  // 確認用に出力
  await mkdir(DIST_DIR).catch(() => false)
  await writeFile(join(DIST_DIR, 'index.html'), html)
})()
