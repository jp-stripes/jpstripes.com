import { renderers } from '@markdoc/markdoc'
import React, { FC } from 'react'

export const Markdoc: FC<{
  content: string
}> = ({ content }) => {
  return <>{renderers.react(JSON.parse(content), React)}</>
}
