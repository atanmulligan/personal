'use client'
import Loading from "@/app/components/v1/Loading"
import { findParticipants } from "@/lib/v1/api/participant"
import { useEffect, useState } from "react"

type Participant = {
    pID: string,
    finished: boolean,
    prolificCode: string,
    createdAt: string,
    finishedAt: string | null
}

export default function Page() {
    const [participants, setParticipants] = useState<Participant[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const result_findParticipants = await findParticipants()
                if (result_findParticipants.result !== "success") {
                    throw new Error("Failed to fetch participants")
                }
                setParticipants(result_findParticipants.participants)
            }
            catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        loadData()
    }, [])

    const timeTaken = (startTime: string, endTime: string | null) => {
        // time taken in format HH:MM:SS
        try {
            if (endTime === null || endTime === undefined) {
                return "-"
            }
            const st = new Date(startTime)
            const et = new Date(endTime)
            const dt = new Date(et.getTime() - st.getTime());
            return dt.toISOString().substr(11, 8);

        } catch (error) {
            console.log(error)
            return "-"
        }

    }


    return (
        <>
            {loading && <Loading />}
            <div className="w-full flex flex-col">
                <div className="text-xl my-12 self-center"><b>Logs</b></div>
                <table>
                    <thead>
                        <tr>
                            <th>Participant ID</th>
                            <th>Finished</th>
                            <th>prolificCode</th>
                            <th>Time Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant, index) => {
                            return <tr key={index}>
                                <a href={`/v1/admin/logs/${participant.pID}`} className="text-blue-600"><td>{participant.pID}</td></a>
                                <td>{participant.finished ? "Finished" : "Not Finished"}</td>
                                <td>{participant.prolificCode}</td>
                                <td>{timeTaken(participant.createdAt, participant.finishedAt)}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div >
        </>
    )
}