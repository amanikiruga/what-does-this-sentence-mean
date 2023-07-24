import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    console.log("fetching definitions");
    const { sentence } = await request.json();
    console.log("sentence", sentence);

    //OpenAI api header
    const openAIHeaders = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    };

    // create prompt
    const prompt = `You are DictionaryGPT. I will give you a sentence like "He will abjure his allegiance to the king." and you will provide the literal meaning as follows: 
    {"literalMeaning": "the person mentioned will renounce or reject his loyalty or allegiance to the king.", 
    "definitions":[{"He" : "refers to a person, the subject of the sentence."}, {"will abjure": "he intends to renounce or reject something, in this case, his allegiance."}, {"his allegiance" : "refers to the loyalty or devotion that he has towards someone, specifically the king."}, {"to the king" : "specifies the target of his allegiance, indicating that he will renounce his loyalty towards the king."}]}
    Please make sure to retain the spelling and punctuation of the original sentence. 
    The new sentence is, ${sentence}"`;

    // fetch definitions from chatgpt
    const openAIBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    };
    const openAIResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: openAIHeaders,
            body: JSON.stringify(openAIBody),
        }
    );
    const openAIData: any = await openAIResponse.json();
    if (openAIData.choices.length) {
        console.log("openAIData", openAIData.choices[0].message.content);

        const response: string = openAIData.choices[0].message.content;

        // await res.json();
        return NextResponse.json({ response });
    } else {
        return NextResponse.json({ response: "" });
    }
}
