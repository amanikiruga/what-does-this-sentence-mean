import { useState } from "react";

export default function SentenceInput({
    sentence,
    setSentence,
    isButtonClicked,
    isButtonLoading,
    onSentenceChange,
    onSubmit,
}: {
    sentence: string;
    isButtonClicked: boolean;
    isButtonLoading: boolean;
    setSentence: (sentence: string) => void;
    onSentenceChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
}) {
    return (
        <div className="flex flex-col mt-4 w-full ">
            <label className="block">
                <textarea
                    className="
    mt-1
    block
    w-full
    rounded-md
    bg-gray-100
    border-transparent
    focus:border-gray-500 focus:bg-white focus:ring-0
  "
                    rows={3}
                    placeholder="Enter a sentence"
                    value={sentence}
                    onChange={onSentenceChange}
                ></textarea>
            </label>
            <div className="flex w-full justify-center">
                <button
                    className="mt-4 bg-slate-300 hover:bg-slate-200 text-slate-600 font-bold py-2 px-4 rounded"
                    onClick={() => {
                        onSubmit();
                        setSentence(sentence.trim());
                    }}
                >
                    {isButtonClicked
                        ? isButtonLoading
                            ? "Loading"
                            : "Try again"
                        : "Get meaning"}
                </button>
            </div>
        </div>
    );
}
