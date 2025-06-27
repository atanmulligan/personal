import { findOneUserProfile } from "../api/userProfile";

export const essayQuestions = {
    "1": 'How would you define yourself in one sentence?',
    "2": `Complete all of the following sentences. And add a reason for each of these strength and weakness
A central strength in my personality: I like how _____________ I am. This is because _____________ .
A central weakness in my personality: I dislike how _____________ I am. This is because _____________ .`,
    "3": "In one sentence, define where you want to be in 10 years.",
    "4": `Complete all of the following sentences. 
I tend to feel stressed when _______________.
When I feel stressed, I try to relieve it by _______________.`,
    "5": `Complete the following sentence:
To me, happiness is _______________.`,
} as { [key: string]: string }

const sentenceCount = {
    "1": 1,
    "2": 4,
    "3": 1,
    "4": 2,
    "5": 1,
} as { [key: string]: number }


export const getEssayTemplate = (essayNumber: string) => {
    const essayPromptTemplate = `You're a doppelgänger of this real person. Embody this person. Using the provided profile, replicate the person's attitudes, thoughts, and mannerisms as accurately as possible. Dive deep into this person's psyche to respond to questions authentically.

Question: ${essayQuestions[essayNumber]}

TASK:
Provide an answer that this person, based on their profile, would likely give.

RULES:
- Sentence COUNT: ${sentenceCount[essayNumber]}.
- Avoid generic responses; offer insights that resonate with this person's personal experiences and worldview.
- Use the profile to infer tone, preferences, and personality, showing a deep understanding of them.
- DO NOT directly cite profile phrases. Describe how these traits manifest in daily life and interactions.
- Ensure responses are natural, reflecting personal introspection, not just profile summaries.
- Use simple, everyday language typical of casual conversations. Think of how this person would speak in a casual, real-life conversation.
- Respond negatively if the person has a negative or cynical attitude.
- Base responses on reasonable inferences from the profile, avoiding leaps of logic.
- EXTREMELY IMPORTANT. Strictly follow these rules to create a compelling and believable doppelgänger portrayal.

`
    return essayPromptTemplate
}

const getEssayPromptD = (essayNumber: string, essayProfiles: { [key: string]: string }) => {
    const essayPromptTemplate = getEssayTemplate(essayNumber)
    return `${essayPromptTemplate}
    ${essayProfiles.D}`
}
const getEssayPromptPV = (essayNumber: string, essayProfiles: { [key: string]: string }) => {
    const essayPromptTemplate = getEssayTemplate(essayNumber)
    return `${essayPromptTemplate}
    ${essayProfiles.P}
    ${essayProfiles.V}`
}

const getEssayPromptC = (essayNumber: string, essayProfiles: { [key: string]: string }) => {
    const essayPromptTemplate = getEssayTemplate(essayNumber)
    return `${essayPromptTemplate}
    ${essayProfiles.C}`
}

const getEssayPromptDPV = (essayNumber: string, essayProfiles: { [key: string]: string }) => {
    const essayPromptTemplate = getEssayTemplate(essayNumber)
    return `${essayPromptTemplate}
    ${essayProfiles.D}
    ${essayProfiles.P}
    ${essayProfiles.V}`
}
const getEssayPromptDPVC = (essayNumber: string, essayProfiles: { [key: string]: string }) => {
    const essayPromptTemplate = getEssayTemplate(essayNumber)
    return `${essayPromptTemplate}
    ${essayProfiles.D}
    ${essayProfiles.P}
    ${essayProfiles.V}
    ${essayProfiles.C}`
}
const getEssayPromptDPVCA = (essayNumber: string, essayProfiles: { [key: string]: string }) => {
    const essayPromptTemplate = getEssayTemplate(essayNumber)
    return `${essayPromptTemplate}
    ${essayProfiles.D}
    ${essayProfiles.P}
    ${essayProfiles.V}
    ${essayProfiles.C}
    ${essayProfiles.A}`
}

export const getEssayPromptsW1 = async (pID: string, essayNumber: string) => {

    const essayPrompts = {} as { [key: string]: string }
    try {
        const userProfileD = await findOneUserProfile(pID, "D");
        if (userProfileD.result !== "success") {
            throw new Error("Error finding user profile D data by pID");
        }
        const userProfileP = await findOneUserProfile(pID, "P");
        if (userProfileP.result !== "success") {
            throw new Error("Error finding user profile P data by pID");
        }
        const userProfileV = await findOneUserProfile(pID, "V");
        if (userProfileV.result !== "success") {
            throw new Error("Error finding user profile V data by pID");
        }
        const userProfileC = await findOneUserProfile(pID, "C");
        if (userProfileC.result !== "success") {
            throw new Error("Error finding user profile C data by pID");
        }
        const userProfileA = await findOneUserProfile(pID, "A");
        if (userProfileA.result !== "success") {
            throw new Error("Error finding user profile A data by pID");
        }
        const essayProfiles = {
            D: userProfileD.userProfile.userProfile,
            P: userProfileP.userProfile.userProfile,
            V: userProfileV.userProfile.userProfile,
            C: userProfileC.userProfile.userProfile,
            A: userProfileA.userProfile.userProfile,
        } as { [key: string]: string }
        essayPrompts["D"] = getEssayPromptD(essayNumber, essayProfiles)
        essayPrompts["DPV"] = getEssayPromptDPV(essayNumber, essayProfiles)
        essayPrompts["DPVC"] = getEssayPromptDPVC(essayNumber, essayProfiles)
        essayPrompts["DPVCA"] = getEssayPromptDPVCA(essayNumber, essayProfiles)
        return { result: "success", essayPrompts }
    } catch (error) {
        console.error("Error finding survey data by pID:", error);
        return {
            result: "failed", error, essayPrompts: {
                D: "",
                DPV: "",
                DPVC: "",
                DPVCA: "",
            }
        };
    }
}

export const getEssayPromptsW2 = async (pID: string, essayNumber: string) => {

    const essayPrompts = {} as { [key: string]: string }
    try {
        const userProfileD = await findOneUserProfile(pID, "D");
        if (userProfileD.result !== "success") {
            throw new Error("Error finding user profile D data by pID");
        }
        const userProfileP = await findOneUserProfile(pID, "P");
        if (userProfileP.result !== "success") {
            throw new Error("Error finding user profile P data by pID");
        }
        const userProfileV = await findOneUserProfile(pID, "V");
        if (userProfileV.result !== "success") {
            throw new Error("Error finding user profile V data by pID");
        }
        const userProfileC = await findOneUserProfile(pID, "C");
        if (userProfileC.result !== "success") {
            throw new Error("Error finding user profile C data by pID");
        }
        // const userProfileA = await findOneUserProfile(pID, "A");
        // if (userProfileA.result !== "success") {
        //     throw new Error("Error finding user profile A data by pID");
        // }
        const essayProfiles = {
            D: userProfileD.userProfile.userProfile,
            P: userProfileP.userProfile.userProfile,
            V: userProfileV.userProfile.userProfile,
            C: userProfileC.userProfile.userProfile,
            // A: userProfileA.userProfile.userProfile,
        } as { [key: string]: string }
        essayPrompts["D"] = getEssayPromptD(essayNumber, essayProfiles)
        essayPrompts["PV"] = getEssayPromptPV(essayNumber, essayProfiles)
        essayPrompts["C"] = getEssayPromptC(essayNumber, essayProfiles)
        essayPrompts["DPVC"] = getEssayPromptDPVC(essayNumber, essayProfiles)
        return { result: "success", essayPrompts }
    } catch (error) {
        console.error("Error finding survey data by pID:", error);
        return {
            result: "failed", error, essayPrompts: {
                D: "",
                PV: "",
                C: "",
                DPVC: "",
            }
        };
    }
}