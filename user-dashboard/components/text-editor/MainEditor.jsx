'use client'

import {
  BoldIcon,
  BreakIcon,
  BulletListIcon,
  CodeIcon,
  HeadingIcon,
  ItalicIcon,
  LinkIcon,
  RedoIcon,
  SendMessageIcon,
  StrikeThrowIcon,
  UndoIcon,
} from '@/staticData/Icon'
import './tiptapstyle.css'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'

import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useCallback, useEffect, useState } from 'react'

export const MenuBar = ({ setText }) => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  useEffect(() => {
    const handleUpdate = () => {
      const contentHTML = editor.getHTML()
      setText(contentHTML)
    }

    editor.on('update', handleUpdate)
    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor])

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex justify-start items-center xs:gap-3 gap-1 text-sm editor-btn px-2 py-1 border-t border-gray-300 order-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <StrikeThrowIcon />
      </button>

      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
        paragraph
      </button> */}

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <HeadingIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <BulletListIcon />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <CodeIcon />
      </button>

      <button
        onClick={setLink}
        className={`${
          editor.isActive('link') ? 'is-active' : ''
        } hover:bg-[#2874ff52] is-active2 hover:rounded-[12px]`}
      >
        <LinkIcon />
      </button>

      <button
        title="Break Line"
        className="hover:bg-[#2874ff52] is-active2 hover:rounded-[12px]"
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <BreakIcon />
      </button>
      <button
        className="hover:bg-[#2874ff52] is-active2 hover:rounded-[12px]"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <UndoIcon />
      </button>
      <button
        className="hover:bg-[#2874ff52] is-active2 hover:rounded-[12px]"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RedoIcon />
      </button>
    </div>
  )
}

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Placeholder.configure({
    placeholder: 'Write a message #',
  }),
  Link.configure({
    openOnClick: false,
  }),
]

// const content = `<h1>hello <h2/>`

const MainEditor = ({ text, setText, handleMessageSend }) => {
  const [iconShow, setIconShow] = useState(false)

  const hasVisibleText = (html) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const textContent = doc.body.textContent || ''

    return textContent.trim().length > 0
  }

  useEffect(() => {
    if (hasVisibleText(text)) {
      setIconShow(true)
    } else {
      setIconShow(false)
    }
    // console.log(hasVisibleText(text))
  }, [text])

  return (
    <>
      <div className="grid text-sm border border-gray-300 rounded-[4px] mt-8 relative">
        <EditorProvider
          slotBefore={<MenuBar setText={setText} />}
          extensions={extensions}
          //   content={content}
        ></EditorProvider>
        {iconShow && (
          <div
            className="w-[29px] cursor-pointer absolute z-100 right-3 top-1 p-1"
            onClick={() => handleMessageSend()}
          >
            <SendMessageIcon />
          </div>
        )}
      </div>
    </>
  )
}

export default MainEditor
