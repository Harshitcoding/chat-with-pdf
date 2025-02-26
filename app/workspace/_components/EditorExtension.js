import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { Bold, Italic, Heading1, Heading2, Heading3, Underline, Code, Sparkle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const EditorExtension = ({ editor }) => {
    const { fileId } = useParams();
    const SearchAI = useAction(api.myAction.search);
    const [isLoading, setIsLoading] = useState(false);

    const onAiClick = async () => {
        if (!editor) return;
        
        setIsLoading(true);
        
        try {
            const selectedText = editor.state.doc.textBetween(
                editor.state.selection.from,
                editor.state.selection.to,
                ''
            );
            
            if (!selectedText || selectedText.trim() === '') {
                console.error("No text selected");
                return;
            }
            
            console.log("selectedText", selectedText);

            const result = await SearchAI({
                query: selectedText,
                fileId: fileId
            });
            
            if (!result) {
                console.error("No search results returned");
                return;
            }

            const parsedResults = JSON.parse(result);
            
            if (!parsedResults || parsedResults.length === 0) {
                console.error("Empty search results");
                return;
            }
            
            // Combine all results into a single string
            let combinedContent = parsedResults.join('\n\n');
            
            // If the results are objects with pageContent property
            if (typeof parsedResults[0] === 'object' && parsedResults[0].pageContent) {
                combinedContent = parsedResults.map(item => item.pageContent).join('\n\n');
            }
            
            // Make sure we have actual content to work with
            if (!combinedContent || combinedContent.trim() === '') {
                console.error("No content extracted from search results");
                return;
            }

            const PROMPT = `For question: "${selectedText}" 
            And with the given content as context: "${combinedContent}"
            Please give an appropriate answer in HTML format that directly addresses the question.
            Format your response as HTML without code blocks or backticks.`;

            const AiModelResult = await chatSession.sendMessage(PROMPT);
            const responseText = await AiModelResult.response.text();
            
            // Clean the response to remove any markdown code blocks
            let FinalAns = responseText;
            if (responseText.includes("```")) {
                FinalAns = responseText
                    .replace(/```html/g, '')
                    .replace(/```/g, '')
                    .trim();
            }

            // Add the AI answer to the editor
            const AllText = editor.getHTML();
            editor.commands.setContent(
                AllText + 
                '<div class="ai-response">' +
                '<p><strong>AI Answer:</strong></p>' +
                FinalAns +
                '</div>'
            );
            
            console.log("AI response added to editor");
        } catch (error) {
            console.error("Error in AI processing:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return editor && (
        <div className="p-5 flex gap-5">
            <div className="control-group">
                <div className="button-group">
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold />
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={editor?.isActive('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic />
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor?.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
                    >
                        <Heading1 />
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor?.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
                    >
                        <Heading2 />
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor?.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
                    >
                        <Heading3 />
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        className={editor?.isActive('underline') ? 'text-blue-500' : ''}
                    >
                        <Underline />
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleCode().run()}
                        className={editor?.isActive('code') ? 'text-blue-500' : ''}
                    >
                        <Code />
                    </button>
                    <button
                        onClick={onAiClick}
                        className={`hover:text-blue-600 ${isLoading ? 'animate-pulse' : ''}`}
                        disabled={isLoading}
                    >
                        <Sparkle />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorExtension;