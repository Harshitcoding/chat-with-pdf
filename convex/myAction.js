import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
    args: {
        splitText: v.any(),
        fileId: v.string()
    },
    handler: async (ctx, args) => {  // Added 'args' parameter here
        await ConvexVectorStore.fromTexts(
            args.splitText,
            args.fileId,
            new GoogleGenerativeAIEmbeddings({
                apiKey: "AIzaSyBYrWAveM-oJKQLEw2zCmlnoILdN0PzFmk",
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title"
            }),
            {ctx}
        );

        return "Completed.."
    },
    
});

export const search = action({
    args: {
        query: v.string(),
        fileId: v.string()
    },
    handler: async (ctx, args) => {
        const vectorStore = new ConvexVectorStore(
            new GoogleGenerativeAIEmbeddings({
                apiKey: "AIzaSyBYrWAveM-oJKQLEw2zCmlnoILdN0PzFmk",
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title"
            }),
            { ctx }
        );
        
        // Get raw results first
        const rawResults = await vectorStore.similaritySearch(args.query, 10);
        
        // Filter results
        const filteredResults = rawResults.filter(q => {
            // Check if the fileId might be split into character properties
            if (q.metadata && typeof q.metadata === 'object') {
                // Try to reconstruct from numeric properties if they exist
                const numericKeys = Object.keys(q.metadata).filter(k => !isNaN(parseInt(k)));
                if (numericKeys.length > 0) {
                    numericKeys.sort((a, b) => parseInt(a) - parseInt(b));
                    const reconstructedId = numericKeys.map(k => q.metadata[k]).join('');
                    return reconstructedId === args.fileId;
                }
            }
            
            return false;
        });
        
        // Extract just the text content from the results
        const textResults = filteredResults.map(doc => doc.pageContent);
        
        console.log("Text results:", textResults);
        return JSON.stringify(textResults);
    },
});