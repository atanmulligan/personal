'use client';

import Button from "@/app/components/v1/Button";
import Text from "@/app/components/v1/Text";
import { defaultCondition } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();

    const handleNext = () => {
        let condition = query.get('cond') as string;
        if (!condition) {
            condition = defaultCondition
        }
        router.push(`/v1/A/consentForm?cond=${condition}`);
    }

    return (
        <div className="flex flex-col w-full gap-6 mb-80">
            <div className="flex justify-center w-full">
                <Text content={`<b>An Instruction and Consent Form for Research Participants</b>`} html={true} />
            </div>
            <Text content={`Title of the research: 
                <b>Research on the development of generative AI-based 
                digital doppelganger and communication process with doppelganger</b>`}
                html={true}
            />
            <Text content={`Principal Investigator: <b>Eun-mee Kim</b>
            <i>(Professor, Department of Communication)</i>`}
                html={true}
            />
            <Text content={`This research aims to evaluate the perceived 
            similarity between individuals and their digital doppelgängers, 
            referred to as AITwinBots, which are generated through large language models (LLM). 
            Participation is entirely voluntary, and your consent is crucial. 
            Please read the following details carefully to understand 
            the research’s purpose and content. Feel free to discuss it with 
            family or friends before deciding. Let us know if you agree to participate. 
            If you have any questions, please contact <u>soeun022@snu.ac.kr</u>. 
            The researcher will offer detailed answers.`}
                html={true}
            />
            <Text
                content={`<b>1. Why is this research being conducted?</b>`}
                html={true}
            />
            <Text
                content={`Using Artificial Intelligence (LLM), 
                    this study aims to develop chatbots that mimic the personalities 
                    of human beings (doppelgängers). This study aims to test if it is 
                    possible to create chatbots (doppelgängers) that exhibit similar 
                    personalities to individuals using AI (LLM). Our goal is to see how 
                    closely these chatbots can match an individual's self-knowledge, 
                    personal traits, values, and lifestyle.`}
                html={true}
            />
            <Text
                content={`<b>2. How many people will participate in the research?</b>`}
                html={true}
            />
            <Text
                content={`Approximately 1000 adults (18 or older) will participate in the study.`}
                html={true}
            />
            <Text
                content={`<b>3. How will the research proceed?</b>`}
                html={true}
            />
            <Text
                content={`The research process is as follows:`}
                html={true}
            />
            <div className="p-4 flex flex-col gap-4">
                <Text
                    content={`1) Read the study details and agree to participate online.`}
                    html={true}
                />
                <Text
                    content={`2) Complete an online pre-survey to share your demographics, personal traits, values, and lifestyle, helping us create your doppelgänger chatbot.`}
                    html={true}
                />
                <Text
                    content={`3) After your doppelgänger chatbot is created, it will generate essays from your perspective. You will evaluate these essays by answering survey questions.`}
                    html={true}
                />
            </div>

            <Text
                content={`<b>4. What is the duration of participation in the research?</b>`}
                html={true}
            />
            <Text
                content={`It will take about <b><u>30-40 minutes</u></b> for surveys and essay evaluation.`}
                html={true}
            />
            <Text
                content={`<b>5. Once participation in the research has begun, is it possible to stop participating?</b>`}
                html={true}
            />
            <Text
                content={`Yes. You are free to withdraw from the study at any time without any negative impact. If you decide to stop, simply close the study website window to ensure your responses are not recorded.`}
                html={true}
            />
            <Text
                content={`<b>6. Are there any side effects or risks involved in participation in this research?</b>`}
                html={true}
            />
            <Text
                content={`Since this study is an online survey and conducted anonymously, no direct side effects or risks are associated with it.`}
                html={true}
            />
            <Text
                content={`<b>7. Are there any advantages to participating in the research?</b>`}
                html={true}
            />
            <Text
                content={`Your participation in this research offers an ample opportunity to advance AI technology and understand how it could mirror human personalities. In comparing your AI counterparts' generated responses with your own, you may gain insight into yourself and the latest AI technology.`}
                html={true}
            />
            <Text
                content={`<b>8. Are there any disadvantages to participating in the research?</b>`}
                html={true}
            />
            <Text
                content={`You can choose to participate or not participate in the research without any negative consequences.`}
                html={true}
            />
            <Text
                content={`<b>9. Is the information gathered during the participation secure?</b>`}
                html={true}
            />
            <Text
                content={`The person responsible for managing the personal data collected in this research is Eun-mee Kim (eunmee@snu.ac.kr)
                at Seoul National University. Eun-mee Kim (Principle investigator) and the research team will only be able to access the data,
                which will be stored securely on password-protected cloud storage and physically on a computer in her office (Room 408, Building 64) at Seoul National University.
                The consent forms will be kept for three years as required by law, then safely discarded. Research data will be preserved permanently following Seoul National University Research Ethics Guidelines,
                with stringent security measures in place to protect your personal information. Any identifiable information will not be disclosed in any form of reports or presentations.
                However, if required by law, your responses may be provided to the Seoul National University Institutional Review Board, which may review the research results to ensure the protection of your data and the integrity of the research.
                Signing this consent form confirms your understanding and agreement to these terms.`}
                html={true}
            />
            <Text
                content={`<b>10. How much will participants be paid for participation?</b>`}
                html={true}
            />
            <Text
                content={`You will be paid 5 dollars for the study of 30-40 minutes.`}
                html={true}
            />
            <Text
                content={`<b>11. If I have any questions about the research, whom can I contact?</b>`}
                html={true}
            />
            <Text
                content={`If you have any questions, issues, or concerns about the research, please reach out to the researcher below.`}
                html={true}
            />
            <div className="flex gap-32">
                <Text
                    content={`Name: Soeun Yang`}
                    html={true}
                />
                <Text
                    content={`Contact: soeun022@snu.ac.kr`}
                    html={true}
                />
            </div>

            <Text
                content={`If you have any questions related to your rights as a research participant, please contact the Seoul National University Institutional Review Board, as shown below.`}
                html={true}
            />
            <Text
                content={`Seoul National University Institutional Review Board (SNUIRB)`}
                html={true}
            />
            <Text
                content={`Phone: 02-880-5153`}
                html={true}
            />
            <Text
                content={`E-mail: irb@snu.ac.kr`}
                html={true}
            />
            <div className="flex justify-center w-full my-8">
                <Button label="next" onClick={handleNext} />
            </div>





        </div>
    )
}