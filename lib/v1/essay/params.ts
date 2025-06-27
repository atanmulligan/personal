export const essayNextRoute = (pID: string, index: string) => {
    if (index === "1") {
        return `/v1/F/EssayTopicInstruction/2?pID=${pID}`
    } else if (index === "2") {
        return `/v1/F/EssayTopicInstruction/3?pID=${pID}`
    } else if (index === "3") {
        return `/v1/F/EssayTopicInstruction/4?pID=${pID}`
    } else if (index === "4") {
        return `/v1/F/EssayTopicInstruction/5?pID=${pID}`
    }
    return `/v1/F/TST?pID=${pID}`
}

export const essayTINextRoute = (pID: string, index: string) => {
    if (index === "1") {
        return `/v1/F/Essay/1?pID=${pID}`
    } else if (index === "2") {
        return `/v1/F/Essay/2?pID=${pID}`
    } else if (index === "3") {
        return `/v1/F/Essay/3?pID=${pID}`
    } else if (index === "4") {
        return `/v1/F/Essay/4?pID=${pID}`
    }
    return `/v1/F/Essay/5?pID=${pID}`
}