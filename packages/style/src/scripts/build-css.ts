import { allStyles } from '../../dist/index.js'
import postcss from 'postcss'
import { parse as postcssJsParse } from 'postcss-js'
import nested from 'postcss-nested'
import { promises as fs } from 'fs'

async function buildCss() {
  let combinedCss = ''

  for (const stylesObj of allStyles) {
    try {
      const result = await postcss([nested]).process(stylesObj, {
        parser: postcssJsParse,
        from: undefined,
      })
      combinedCss += result.css
      combinedCss += '\n'
    } catch (error) {
      console.error('Error processing CSS:', error)
    }
  }

  try {
    await fs.writeFile('dist/prose-ui.css', combinedCss, 'utf8')
    console.log('CSS output written to dist/prose-ui.css')
  } catch (error) {
    console.error('Error writing to file:', error)
  }
}

buildCss()
