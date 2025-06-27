'use client'
import Button from "@/app/components/v1/Button";
import { useRouter } from "next/navigation";
import { conditionDesc, conditions } from "@/lib/v1/urlParams";
import Text from "@/app/components/v1/Text";

export default function Page() {
    const router = useRouter();

    const handleExperimentClick = (condition: string) => {
        router.push(`/v1/A/ICRP?cond=${condition}`)
    }

    return (<div className="w-full flex flex-col">
        <div className="text-xl my-12 self-center"><b>ADMIN PAGE</b></div>
        <div className="my-3"><b>EXPERIMENT</b></div>

        <div className="mb-6 flex">
            {conditions.map((condition, index) => {
                return <div key={index} className="mr-2 mb-2">
                    <Button label={condition} onClick={() => { handleExperimentClick(condition) }} active={true} />
                </div>
            })}

        </div>
        <div className="mb-6 flex flex-col">
            {Object.entries(conditionDesc).map(([key, value], index) => {
                return <Text key={index} content={`${key} : ${value}`} />
            })}
        </div>


        <div className="my-3"><b>LOG</b></div>
        <div className="mb-6">
            <div className="mr-2 mb-2">
                <Button label="v1" onClick={() => { router.push('/v1/admin/logs') }} active={true} />
            </div>
        </div>

        <div className="my-3"><b>SystemMessage</b></div>
        <div className="mb-6">
            <div className="mr-2 mb-2">
                <Button label="v1" onClick={() => { router.push('/v1/admin/systemMessage') }} active={true} />
            </div>
        </div>


        <Text content="<b>DEV</b>" html={true} />
        <Button label="dev" onClick={() => { router.push('/v1/admin/dev') }} />
    </div >)
}