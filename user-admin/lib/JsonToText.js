'use client'

import { generateHTML } from '@tiptap/html'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bullet_List from '@tiptap/extension-bullet-list'
import Color from '@tiptap/extension-color'
import Code from '@tiptap/extension-code'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Strike from '@tiptap/extension-strike'
import List_Item from '@tiptap/extension-list-item'
import Hard_Break from '@tiptap/extension-hard-break'
import CodeBlock from '@tiptap/extension-code-block'

const JsonToText = (text, isInForm = true) => {
  if (text) {
    const convertedText = generateHTML(text, [
      Document,
      Paragraph,
      Text,
      Bold,
      Heading,
      Bullet_List,
      Color,
      Code,
      Italic,
      Link,
      Strike,
      List_Item,
      Hard_Break,
      CodeBlock,
      // other extensions …
    ])
    if (isInForm) {
      return convertedText
    } else {
      return <div dangerouslySetInnerHTML={{ __html: convertedText }} />
    }
  } else {
    return
  }
}

export default JsonToText
