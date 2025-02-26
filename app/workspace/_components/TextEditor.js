import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import EditorExtension from "./EditorExtension"
import Underline from "@tiptap/extension-underline"

const TextEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
                placeholder:"Start Taking your notes here..."
            }),
            Underline,
        ],
        content: '',
        editorProps:{
            attributes:{
                class:'focus:outline-none'
            }
        }
      })
    
  return (
    <div>
         <EditorExtension editor={editor}/>
        <div>
        <EditorContent editor={editor} />
        </div>
    </div>
  )
}
export default TextEditor