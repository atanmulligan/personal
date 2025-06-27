"use client";

import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import Loading from "@/app/components/v1/Loading";
import { findParticipantsByPIDs } from "@/lib/v1/api/participant";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [prolificCode, setProlificCode] = useState("");
    const [btnMessage, setBtnMessage] = useState("copy");
    useEffect(() => {
        const loadData = async () => {
            let _pID = getPID(query);
            try {
                const result_findParticipant = await findParticipantsByPIDs([_pID]);
                if (result_findParticipant.result !== 'success') {
                    throw new Error('Error finding participant. Please try again.');
                }
                if (result_findParticipant.participants.length == 0) {
                    throw new Error('Participant not found. Please try again.');
                }
                setProlificCode(result_findParticipant.participants[0].prolificCode);

            } catch (e) {
                alert(e)
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(prolificCode);
        setBtnMessage("copied");
    }

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto">
                <div className="w-full">
                    To confirm you have completed the study, please copy the below completion code and paste it to the Prolific page.
                </div>
                <ColoredBox>
                    <div className="flex justify-between items-center">
                        <div>{prolificCode}</div>
                        <Button label={btnMessage} onClick={handleCopy} />
                    </div>
                </ColoredBox>
                <div className="w-full">
                    Thank you for taking the time to complete our survey. Your participation is crucial in helping us gain a better understanding of building an AI-generated chatbot and its impact. Your responses will be treated with confidentiality and used solely for academic purposes. Once again, we sincerely appreciate your participation.
                </div>
            </div>
        </>
    );
}
