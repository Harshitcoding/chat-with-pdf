import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl = "https://cheerful-meerkat-228.convex.cloud/api/storage/dc02da8c-0f47-4fb6-87f4-79971eb608c9";

export async function GET(req) {

    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl)
    const pdfUrl = searchParams.get('pdfUrl')
    console.log(pdfUrl) 

    // 1. Load the PDF File into texxt
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc => {
        pdfTextContent = pdfTextContent + doc.pageContent+"";
    });

    //2. Split the text into small Chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });
    const output = await splitter.createDocuments([pdfTextContent])

    let splitterList = [];
    output.forEach(doc => {
        splitterList.push(doc.pageContent)
    })

    return NextResponse.json({ result: splitterList });
}


