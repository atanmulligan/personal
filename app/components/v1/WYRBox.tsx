'use client'

import { useEffect, useState } from "react";

type Question = {
    symbol: string;
    question: string;
}

export default function WYRBox({ name, questions, onChange = (s, v) => { }, valueLoaded = null }: {
    name: string;
    questions: Question[];
    onChange?: (symbol: string, value: string) => void;
    valueLoaded?: string | null;
}) {
    const [selectedValue, setSelectedValue] = useState<string | null>(valueLoaded);

    useEffect(() => {
        setSelectedValue(valueLoaded);
    }, [valueLoaded]);

    const handleOnChange = (name: string, symbol: string) => {
        setSelectedValue(symbol)
        onChange(name, symbol)
    }
    return (
        <div className="flex flex-col w-full py-8 px-12 justify-center items-center bg-[#E8EDF4] rounded-lg gap-2">
            {questions.map((question, index) => (
                <div key={question.symbol} className="flex w-full">
                    <p>Option {question.symbol}: {question.question}</p>

                </div>
            ))}
            <div className="flex gap-6 mt-6">
                {questions.map((question, index) => (
                    <div key={question.symbol} className="flex mx-2">
                        <div className="flex justify-center items-center cursor-pointer gap-2">
                            <input
                                type="radio"
                                name={name}
                                checked={selectedValue === question.symbol}
                                value={question.symbol}
                                onChange={() => handleOnChange(name, question.symbol)}
                                className="h-6 w-6 "
                                required
                            />
                            <div>{question.symbol}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}