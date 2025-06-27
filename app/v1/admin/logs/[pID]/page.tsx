'use client'

import Loading from "@/app/components/v1/Loading"
import { findParticipantsByPIDs } from "@/lib/v1/api/participant"
import { findOneSurvey } from "@/lib/v1/api/survey"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { pID: string } }) {
    const [loading, setLoading] = useState(true)
    const [finished, setFinished] = useState<boolean>(false)
    const [b1Completed, setB1Completed] = useState<boolean>(false)
    const [b2Completed, setB2Completed] = useState<boolean>(false)
    const [c2Completed, setC2Completed] = useState<boolean>(false)
    const [c4Completed, setC4Completed] = useState<boolean>(false)
    const [bfiCompleted, setBfiCompleted] = useState<boolean>(false)
    const [pvqCompleted, setPvqCompleted] = useState<boolean>(false)
    const [wyrCompleted, setWyrCompleted] = useState<boolean>(false)
    const [essay1Completed, setEssay1Completed] = useState<boolean>(false)
    const [essay2Completed, setEssay2Completed] = useState<boolean>(false)
    const [essay3Completed, setEssay3Completed] = useState<boolean>(false)
    const [essay4Completed, setEssay4Completed] = useState<boolean>(false)
    const [essay5Completed, setEssay5Completed] = useState<boolean>(false)
    const [interviewCompleted, setInterviewCompleted] = useState<boolean>(false)



    useEffect(() => {
        const loadData = async () => {
            try {
                const result_findOneParticipants = await findParticipantsByPIDs([params.pID])
                if (result_findOneParticipants.result !== "success") {
                    throw new Error("Failed to fetch participant")
                }
                const participant = result_findOneParticipants.participants[0]
                if (participant?.finished) {
                    setFinished(participant.finished)
                }
                const result_findB1 = await findOneSurvey(params.pID, "B1GS")
                if (result_findB1.result !== "success") {
                    throw new Error("Failed to fetch B1GS")
                }
                if (result_findB1.survey?.formData) {
                    setB1Completed(true)
                }
                const result_findB2 = await findOneSurvey(params.pID, "B2AP")
                if (result_findB2.result !== "success") {
                    throw new Error("Failed to fetch B2AP")
                }
                if (result_findB2.survey?.formData) {
                    setB2Completed(true)
                }
                const result_findC2 = await findOneSurvey(params.pID, "C2FD")
                if (result_findC2.result !== "success") {
                    throw new Error("Failed to fetch C2")
                }
                if (result_findC2.survey?.formData) {
                    setC2Completed(true)
                }
                const result_findC4 = await findOneSurvey(params.pID, "C4DL")
                if (result_findC4.result !== "success") {
                    throw new Error("Failed to fetch C4")
                }
                if (result_findC4.survey?.formData) {
                    setC4Completed(true)
                }
                const result_findBfi = await findOneSurvey(params.pID, "BFI")
                if (result_findBfi.result !== "success") {
                    throw new Error("Failed to fetch BFI")
                }
                if (result_findBfi.survey?.formData) {
                    setBfiCompleted(true)
                }
                const result_findPvq = await findOneSurvey(params.pID, "PVQ")
                if (result_findPvq.result !== "success") {
                    throw new Error("Failed to fetch PVQ")
                }
                if (result_findPvq.survey?.formData) {
                    setPvqCompleted(true)
                }
                const result_findWyr = await findOneSurvey(params.pID, "WYR")
                if (result_findWyr.result !== "success") {
                    throw new Error("Failed to fetch WYR")
                }
                if (result_findWyr.survey?.formData) {
                    setWyrCompleted(true)
                }
                const result_findEssay1 = await findOneSurvey(params.pID, "Essay1")
                if (result_findEssay1.result !== "success") {
                    throw new Error("Failed to fetch Essay1")
                }
                if (result_findEssay1.survey?.formData) {
                    setEssay1Completed(true)
                }
                const result_findEssay2 = await findOneSurvey(params.pID, "Essay2")
                if (result_findEssay2.result !== "success") {
                    throw new Error("Failed to fetch Essay2")
                }
                if (result_findEssay2.survey?.formData) {
                    setEssay2Completed(true)
                }
                const result_findEssay3 = await findOneSurvey(params.pID, "Essay3")
                if (result_findEssay3.result !== "success") {
                    throw new Error("Failed to fetch Essay3")
                }
                if (result_findEssay3.survey?.formData) {
                    setEssay3Completed(true)
                }
                const result_findEssay4 = await findOneSurvey(params.pID, "Essay4")
                if (result_findEssay4.result !== "success") {
                    throw new Error("Failed to fetch Essay4")
                }
                if (result_findEssay4.survey?.formData) {
                    setEssay4Completed(true)
                }
                const result_findEssay5 = await findOneSurvey(params.pID, "Essay5")
                if (result_findEssay5.result !== "success") {
                    throw new Error("Failed to fetch Essay5")
                }
                if (result_findEssay5.survey?.formData) {
                    setEssay5Completed(true)
                }
                if (participant?.interview === true || participant?.interview === false) {
                    setInterviewCompleted(true)
                }


            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        loadData()

    }, [])


    return (
        <>
            {loading && <Loading />}
            <div className="w-full flex flex-col">
                <div className="text-xl my-12 self-center"><b>Logs for {params.pID}</b></div>
                <div><b>Status</b>: {finished ? "Finished" : "Not Finished"}</div>
                <div><b>B1GS</b>: {b1Completed ? "Completed" : "Not Completed"}</div>
                <div><b>B2AP</b>: {b2Completed ? "Completed" : "Not Completed"}</div>
                <div><b>C2</b>: {c2Completed ? "Completed" : "Not Completed"}</div>
                <div><b>C4</b>: {c4Completed ? "Completed" : "Not Completed"}</div>
                <div><b>BFI</b>: {bfiCompleted ? "Completed" : "Not Completed"}</div>
                <div><b>PVQ</b>: {pvqCompleted ? "Completed" : "Not Completed"}</div>
                <div><b>WYR</b>: {wyrCompleted ? "Completed" : "Not Completed"}</div>
                <div><b>Essay1</b>: {essay1Completed ? "Completed" : "Not Completed"}</div>
                <div><b>Essay2</b>: {essay2Completed ? "Completed" : "Not Completed"}</div>
                <div><b>Essay3</b>: {essay3Completed ? "Completed" : "Not Completed"}</div>
                <div><b>Essay4</b>: {essay4Completed ? "Completed" : "Not Completed"}</div>
                <div><b>Essay5</b>: {essay5Completed ? "Completed" : "Not Completed"}</div>
                <div><b>Interview</b>: {interviewCompleted ? "Completed" : "Not Completed"}</div>

            </div >
        </>
    )
}