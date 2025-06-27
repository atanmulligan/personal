import { findOneUserProfile } from "../api/userProfile";

export const tstTemplate = `There are six numbered blanks. Please write six different answers to the simple question "Who am I?" in the blanks. Each response SHOULD be in sentence form. Write it as a numbered list. The number should not be a key.

For the first three blanks, describe aspects of yourself that you believe are well-known to both you and those around you. Write with JSON key "open_self".

For the next three blanks, describe aspects of yourself that you keep private or don't openly share with others. Write with JSON key "hidden_self". 

[JSON Format]
{
    result: {
        open_self: [
            "...",
            "...",
            "..."
        ],
        hidden_self: [
            "...",
            "...",
            "..."
        ]
    }
}

`

export const tstTemplateW2 = `There are six numbered blanks. Please write six different answers to the simple question "Who am I?" in the blanks. For the response, write a sentence that reflects a complex aspect of yourself, not just a simple listing of facts. Each response SHOULD be in sentence form. Write it as a numbered list. The number should not be a key.

For the first three blanks, describe aspects of yourself that you believe are well-known to both you and those around you. Write with JSON key "open_self".

For the next three blanks, describe aspects of yourself that you keep private or don't openly share with others. Write with JSON key "hidden_self". 

[JSON Format]
{
    result: {
        open_self: [
            "...",
            "...",
            "..."
        ],
        hidden_self: [
            "...",
            "...",
            "..."
        ]
    }
}

`

const getTSTPromptD = (userProfiles: { [key: string]: string }) => {
    return `${tstTemplate}
    ${userProfiles.D}`
}
const getTSTPromptPV = (userProfiles: { [key: string]: string }) => {
    return `${tstTemplate}
    ${userProfiles.P}
    ${userProfiles.V}`
}
const getTSTPromptC = (userProfiles: { [key: string]: string }) => {
    return `${tstTemplate}
    ${userProfiles.C}`
}
const getTSTPromptDPV = (userProfiles: { [key: string]: string }) => {
    return `${tstTemplate}
    ${userProfiles.D}
    ${userProfiles.P}
    ${userProfiles.V}`
}
const getTSTPromptDPVC = (userProfiles: { [key: string]: string }) => {
    return `${tstTemplate}
    ${userProfiles.D}
    ${userProfiles.P}
    ${userProfiles.V}
    ${userProfiles.C}`
}
const getTSTPromptDPVCA = (userProfiles: { [key: string]: string }) => {
    return `${tstTemplate}
    ${userProfiles.D}
    ${userProfiles.P}
    ${userProfiles.V}
    ${userProfiles.C}
    ${userProfiles.A}`
}

export const getTSTPromptsW1 = async (pID: string) => {
    const tstPrompts = {} as { [key: string]: string }
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
        tstPrompts.D = getTSTPromptD(essayProfiles);
        tstPrompts.DPV = getTSTPromptDPV(essayProfiles);
        tstPrompts.DPVC = getTSTPromptDPVC(essayProfiles);
        tstPrompts.DPVCA = getTSTPromptDPVCA(essayProfiles);
        return { result: "success", tstPrompts };
    } catch (error) {
        return {
            result: "failed", error, tstPrompts: {
                D: "",
                DPV: "",
                DPVC: "",
                DPVCA: ""
            }
        };
    }
}
export const getTSTPromptsW2 = async (pID: string) => {
    const tstPrompts = {} as { [key: string]: string }
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
        tstPrompts.D = getTSTPromptD(essayProfiles);
        tstPrompts.PV = getTSTPromptPV(essayProfiles);
        tstPrompts.C = getTSTPromptC(essayProfiles);
        tstPrompts.DPVC = getTSTPromptDPVC(essayProfiles);
        return { result: "success", tstPrompts };
    } catch (error) {
        return {
            result: "failed", error, tstPrompts: {
                D: "",
                PV: "",
                C: "",
                DPVC: ""
            }
        };
    }
}
