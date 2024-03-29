import { parse, transform } from '@markdoc/markdoc'
import { readFileSync } from 'fs'
import { join } from 'path'

export const loadMarkdownFile = (path: string) => {
  const content = readFileSync(join(process.cwd(), path), 'utf-8')
  return transform(parse(content))
}
