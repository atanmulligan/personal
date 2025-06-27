'use client'
import Button from "@/app/components/v1/Button"
import Loading from "@/app/components/v1/Loading"
import { findParticipants } from "@/lib/v1/api/participant"
import { findOneUserProfile } from "@/lib/v1/api/userProfile"
import { tstTemplate, tstTemplateW2 } from "@/lib/v1/userProfile/tst"
import { essayQuestions, getEssayTemplate } from "@/lib/v1/userProfile/userProfile"
import { generatePJSONFormat, generatePTemplate } from "@/lib/v1/userProfile/userProfileP"
import { generateVJSONFormat, generateVTemplate } from "@/lib/v1/userProfile/userProfileV"
import { set } from "mongoose"
import { useEffect, useState } from "react"

type Participant = {
    pID: string,
    finished: boolean,
    prolificCode: string,
    createdAt: string,
    finishedAt: string | null
}

export default function Page() {
    const [qNum, setQNum] = useState("1")
    const [essayTemplate, setEssayTemplate] = useState<string>(getEssayTemplate('1'))
    const [finishedUsers, setFinishedUsers] = useState<Participant[]>([])
    const [selectedpID, setSelectedpID] = useState<string>("testuser")
    const [character, setCharacter] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleQNumChange = (q: string) => {
        setQNum(q)
        setEssayTemplate(getEssayTemplate(q))
    }

    const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSelectedpID(e.target.value)
    }

    const handleConditionChange = async (condition: string) => {
        setLoading(true)
        try {
            console.log(selectedpID, condition)
            const result_findUserProfile = await findOneUserProfile(selectedpID, condition)
            if (result_findUserProfile.result !== "success") {
                throw new Error("Error loading data")
            }
            console.log(result_findUserProfile)
            setCharacter(result_findUserProfile.userProfile.userProfile)

        } catch (error) {
            alert(error)
        }

        setLoading(false)
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const result_findParticipants = await findParticipants()
                if (result_findParticipants.result !== "success") {
                    throw new Error("Error loading data")
                }
                setFinishedUsers(result_findParticipants.participants.filter((p: Participant) => p.finished))

            } catch (error) {
                console.error("Error loading data:", error)
            }
        }
        loadData()
    }, [])



    return (
        <>
            {loading && <Loading />}
            <div className="w-full flex flex-col mb-80">
                <div className="text-xl my-12 self-center"><b>System Message</b></div>
                <div className="flex flex-col gap-6">
                    <div><b>[Generate P SystemMessage]</b></div>
                    <textarea className="border p-4 h-80"
                        value={generatePTemplate}
                    />
                    <div><b>[Generate P JSON Format]</b></div>
                    <textarea className="border p-4 h-80"
                        value={generatePJSONFormat} />
                    <div><b>[Generate V SystemMessage]</b></div>
                    <textarea className="border p-4 h-80"
                        value={generateVTemplate}
                    />
                    <div><b>[Generate V JSON Format]</b></div>
                    <textarea className="border p-4 h-80"
                        value={generateVJSONFormat} />
                    <div><b>[Essay Questions]</b></div>
                    {Object.entries(essayQuestions).map(([key, value], index) => {
                        return <div key={index} className="flex flex-col gap-2">
                            <div><b>{key}</b></div>
                            <div>{value}</div>
                        </div>

                    })}
                    <div><b>[Essay Template (ex. Question {qNum})]</b></div>
                    <div className="flex gap-2">
                        <Button label="Question 1" onClick={() => handleQNumChange("1")} />
                        <Button label="Question 2" onClick={() => handleQNumChange("2")} />
                        <Button label="Question 3" onClick={() => handleQNumChange("3")} />
                        <Button label="Question 4" onClick={() => handleQNumChange("4")} />
                        <Button label="Question 5" onClick={() => handleQNumChange("5")} />
                    </div>
                    <textarea className="border p-4 h-80"
                        value={essayTemplate}
                    />
                    <div><b>[TST Template]</b></div>
                    <textarea className="border p-4 h-80"
                        value={tstTemplate}
                    />
                    <div><b>[TST Template W2]</b></div>
                    <textarea className="border p-4 h-80"
                        value={tstTemplateW2}
                    />
                    <div><b>[Character]</b></div>
                    <select className="border p-4" value={selectedpID} onChange={handleSelectUser}>
                        {finishedUsers.map((p, index) => {
                            return <option key={index} value={p.pID}>{p.pID}</option>
                        })}
                    </select>
                    <div className="flex gap-2">
                        <Button label="D" onClick={() => handleConditionChange("D")} />
                        <Button label="P" onClick={() => handleConditionChange("P")} />
                        <Button label="V" onClick={() => handleConditionChange("V")} />
                        <Button label="C" onClick={() => handleConditionChange("C")} />
                        <Button label="A" onClick={() => handleConditionChange("A")} />
                        {/* <Button label="P" onClick={() => handleConditionChange("DP")} />
                        <Button label="V" onClick={() => handleConditionChange("DPVC")} />
                        <Button label="C" onClick={() => handleConditionChange("DPVCA")} /> */}
                        {/* <Button label="DP" onClick={() => handleQNumChange("2")} />
                        <Button label="DPVC" onClick={() => handleQNumChange("3")} />
                        <Button label="DPVCA" onClick={() => handleQNumChange("4")} /> */}
                    </div>

                    <textarea className="border p-4 h-80"
                        value={character} />
                </div>



            </div >
        </>
    )
}