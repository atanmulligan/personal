'use client'
import Button from "@/app/components/v1/Button";
import ChatContent from "@/app/components/v1/ChatContent";
import ColoredBox from "@/app/components/v1/ColoredBox";
import TextInput from "@/app/components/v1/TextInput";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        console.log("Chat Page Loaded")
    }, [])

    return (

        <div className="flex flex-col gap-6 w-full items-center justify-center mx-auto h-[70vh]">
            {/* CHATs */}
            <div className="w-full bg-[#E8EDF4] flex flex-col justify-start gap-6 py-10 px-12 rounded-lg flex-grow overflow-y-scroll">
                <ChatContent content="ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}" role={true} />
                <ChatContent content="ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}" role={false} />
                <ChatContent content="ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}" role={true} />
                <ChatContent content="ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}" role={false} /><ChatContent content="ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}" role={true} />
                <ChatContent content="ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}" role={false} /><ChatContent content="ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}" role={true} />
                <ChatContent content="ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}" role={false} /><ChatContent content="ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}ChatContent role={true}" role={true} />
                <ChatContent content="ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}ChatContent role={false}" role={false} />


            </div>

            {/* Input and Send Button */}
            <div className="w-full flex flex-grow-0 justify-between items-center gap-6 ">
                <input type="text" name={"name"} className="bg-[#E8EDF4] flex-grow mx-4 h-8 border rounded p-6" />
                <Button label="Send" onClick={() => { }} active={true} />
            </div>
        </div>



    );
}