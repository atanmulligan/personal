'use client'
import Button from "@/app/components/v1/Button";
import { useRouter } from "next/navigation";
import { conditions } from "@/lib/v1/urlParams";
import Title from "@/app/components/v1/Title";
import Text from "@/app/components/v1/Text";

export default function Page() {

    const router = useRouter();
    const layoutPagesA = ['ICRP', 'consent form', 'prolific ID', 'general instructions']
    const layoutPagesB = ['pre-qn (inst.)', 'B1GS', 'B2AP']
    const layoutPagesC = ['open-ended questions (inst.)', 'C1PT', 'C2FD', 'C3KV', 'C4DL']
    const layoutPagesD = ['BFI', 'PVQ']
    const layoutPagesE = ['demographics', 'spi', 'WYR']
    const layoutPagesF = ['essay inst.', 'essay topic inst.', 'essay', 'tst']
    const layoutPagesG = ['chat inst.', 'chat', 'chat evaluation', 'chat interview']
    const layoutPagesH = ['interview', 'wrap up']

    const layoutPagesList = [layoutPagesA, layoutPagesB, layoutPagesC, layoutPagesD, layoutPagesE, layoutPagesF, layoutPagesG, layoutPagesH]
    // const layoutPages = ['consent form',
    //     'general instructions',
    //     'pre-qn (b0_inst.)',
    //     'B1GS',
    //     'B2AP',
    //     'open-ended questions (inst.)',
    //     'C1PT',
    //     'C2FD',
    //     'C3KV',
    //     'C4DL',
    //     'demographic information', 'essay generation', 'tst generation', 'chat', 'wrap up']
    const layoutPagesURLs = {
        'ICRP': '/v1/A/ICRP',
        'consent form': '/v1/A/consentForm',
        'prolific ID': '/v1/A/prolificID',
        'general instructions': '/v1/A/generalInstructions',
        'pre-qn (inst.)': '/v1/B/instruction',
        'B1GS': '/v1/B/B1GS',
        'B2AP': '/v1/B/B2AP',
        'open-ended questions (inst.)': '/v1/C/instruction',
        'C1PT': '/v1/C/C1PT',
        'C2FD': '/v1/C/C2FD',
        'C3KV': '/v1/C/C3KV',
        'C4DL': '/v1/C/C4DL',
        'BFI': '/v1/D/BFI',
        'PVQ': '/v1/D/PVQ',
        'demographics': '/v1/E/demographics',
        'spi': '/v1/E/spi',
        'WYR': '/v1/E/WYR',
        'essay inst.': '/v1/F/EssayInstruction',
        'essay topic inst.': '/v1/F/EssayTopicInstruction/1',
        'essay': '/v1/F/Essay/1',
        'tst': '/v1/F/TST',
        'chat inst.': '/v1/G/instruction',
        'chat': '/v1/G/chat',
        'chat evaluation': '/v1/G/evaluation',
        'chat interview': '/v1/G/interview',
        'interview': '/v1/H/interview',
        'wrap up': '/v1/H/wrapUp'
    } as { [key: string]: string }

    const deactivatedPages = ['C1PT', 'C3KV', 'chat inst.', 'chat', 'chat evaluation', 'chat interview']
    const checkDeactivated = (page: string) => {
        return !deactivatedPages.includes(page)
    }


    // const expt_DA_DAO_O = () => {
    //     console.log("expt_DA_DAO_O")
    // }

    const handleExperimentClick = (condition: string) => {
        router.push(`/v1/A/generalInstructions?cond=${condition}`)
    }
    const handlePageClick = (page: string) => {
        router.push(layoutPagesURLs[page])
    }

    return (<div className="w-full flex flex-col gap-6">
        <Title content="DEV PAGE" />
        {/* <div className="text-xl my-12 self-center"><b>DEV PAGE</b></div> */}

        <Text content="<b>COMPONENTS</b>" html={true} />
        <Button label="components" onClick={() => { router.push("/v1/dev/components") }} active={true} />
        <Text content="<b>PAGE LAYOUT</b>" html={true} />
        {/* <div className="my-3"><b>PAGE LAYOUT</b></div> */}
        <div className="mb-2 flex flex-col">
            {
                layoutPagesList.map((layoutPages, index) => {
                    return <div key={index} className="flex flex-wrap">
                        {layoutPages.map((page, index) => {
                            return <div key={index} className="mr-2 mb-2">
                                <Button label={page} onClick={() => { handlePageClick(page) }} active={checkDeactivated(page)} />
                            </div>
                        })
                        }
                    </div>
                })
            }
            {/* <div className="flex flex-wrap">
                {layoutPagesA.map((page, index) => {
                    return <div key={index} className="mr-2 mb-2">
                        <Button label={page} onClick={() => { handlePageClick(page) }} active={true} />
                    </div>
                })
                }
            </div>
            <div className="flex flex-wrap">
                {layoutPagesB.map((page, index) => {
                    return <div key={index} className="mr-2 mb-2">
                        <Button label={page} onClick={() => { handlePageClick(page) }} active={true} />
                    </div>
                })
                }
            </div> */}

        </div>
    </div >)
}