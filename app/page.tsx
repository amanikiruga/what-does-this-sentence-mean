"use client";
import Image from "next/image";
import SentenceInput from "./sentence-input";
import { useState } from "react";
import Output from "./output";
import DefinitionPopup from "./definition-popup";
import Footer from "./footer";

export default function Home() {
    const [sentence, setSentence] = useState("");
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [sentencesWithDefinitions, setSentencesWithDefinitions] = useState<
        JSX.Element[]
    >([]);
    const [meaning, setMeaning] = useState("");
    const [error, setError] = useState("");
    const colors = [
        ["bg-purple-300", "text-purple-900"],
        ["bg-blue-300", "text-blue-900"],
        ["bg-green-300", "text-green-900"],
        ["bg-yellow-300", "text-yellow-900"],
        ["bg-red-300", "text-red-900"],
        ["bg-pink-300", "text-pink-900"],
        ["bg-indigo-300", "text-indigo-900"],
        ["bg-gray-300", "text-gray-900"],
        ["bg-orange-300", "text-orange-900"],
        ["bg-teal-300", "text-teal-900"],
        ["bg-cyan-300", "text-cyan-900"],
        ["bg-lime-300", "text-lime-900"],
        ["bg-fuchsia-300", "text-fuchsia-900"],
        ["bg-rose-300", "text-rose-900"],
        ["bg-emerald-300", "text-emerald-900"],
        ["bg-violet-300", "text-violet-900"],
        ["bg-sky-300", "text-sky-900"],
        ["bg-amber-300", "text-amber-900"],
    ];
    const onSentenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSentence(e.target.value);
        setIsButtonClicked(false);
    };
    const onSubmit = async () => {
        console.log("submit");
        setIsButtonClicked(true);
        setIsButtonLoading(true);
        const response = await fetch("/api/fetch-definitions", {
            method: "POST",
            body: JSON.stringify({ sentence: sentence.trim() }),
        });
        const data = await response.json();
        setIsButtonLoading(false);
        console.log("data", data);
        try {
            const meaningsAndDefinitions = JSON.parse(data.response);
            const definitions = meaningsAndDefinitions.definitions;
            console.log("definitions", meaningsAndDefinitions.definitions);
            // underline every phrase in the sentence that has a definition. The list of phrases is in order of appearance in the sentence.
            let savedIndex = 0; // the index of the current phrase in the sentence
            let colorIndex = 0; // the index of the current color in the colors array
            let sentences = [];
            const firstPhrase = Object.keys(definitions[0])[0];
            const firstIndex = sentence.indexOf(firstPhrase);
            if (firstIndex > 0) {
                const firstSentence = (
                    <DefinitionPopup
                        phrase={sentence.slice(0, firstIndex)}
                        definition={definitions[0][firstPhrase]}
                        textColor={colors[colorIndex][1]}
                        backgroundColor={colors[colorIndex][0]}
                    />
                );
                colorIndex = (colorIndex + 1) % colors.length;
                sentences.push(firstSentence);
            }
            for (let i = 0; i < definitions.length - 1; i++) {
                const curPhrase = Object.keys(definitions[i])[0];
                const nextPhrase = Object.keys(definitions[i + 1])[0];
                const curIndex = sentence.indexOf(curPhrase, savedIndex);
                if (curIndex === -1) continue;
                const nextIndex = sentence.indexOf(nextPhrase, curIndex);
                if (nextIndex === -1) continue;
                savedIndex = nextIndex;
                const currentSentence = (
                    <DefinitionPopup
                        phrase={sentence.slice(curIndex, nextIndex)}
                        definition={definitions[i][curPhrase]}
                        textColor={colors[colorIndex][1]}
                        backgroundColor={colors[colorIndex][0]}
                    />
                );
                colorIndex = (colorIndex + 1) % colors.length;
                sentences.push(currentSentence);
            }
            const lastPhrase = Object.keys(
                definitions[definitions.length - 1]
            )[0];
            const lastIndex = sentence.indexOf(lastPhrase, savedIndex);
            const lastSentence = (
                <DefinitionPopup
                    phrase={sentence.slice(lastIndex)}
                    definition={definitions[definitions.length - 1][lastPhrase]}
                    textColor={colors[colorIndex][1]}
                    backgroundColor={colors[colorIndex][0]}
                />
            );
            colorIndex = (colorIndex + 1) % colors.length;
            sentences.push(lastSentence);
            console.log("sentences", sentences);

            setSentencesWithDefinitions(sentences);

            setMeaning(meaningsAndDefinitions.literalMeaning);
            setError("");
        } catch (e) {
            console.log(e);
            setError("Something went wrong, please try again.");
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="p-8 w-full max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-4">
                    What Does This Sentence Mean?
                </h1>
                <p className="text-xl text-center mb-8">
                    A simple tool to get the literal meaning of any sentence in
                    context
                </p>
                <SentenceInput
                    sentence={sentence}
                    setSentence={setSentence}
                    onSentenceChange={onSentenceChange}
                    isButtonClicked={isButtonClicked}
                    isButtonLoading={isButtonLoading}
                    onSubmit={onSubmit}
                />
                <Output
                    sentencesWithDefinitions={sentencesWithDefinitions}
                    meaning={meaning}
                    error={error}
                />
                <Footer />
            </div>
        </div>
    );
}
