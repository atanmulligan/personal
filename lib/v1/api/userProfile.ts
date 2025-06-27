
export const findOneUserProfile = async (pID: string, code: string) => {
    const response = await fetch("/api/v1/UserProfile/findOne", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pID, code }),
    });
    return response.json();
}

export const updateUserProfile = async (
    pID: string,
    code: string,
    userProfile: string,
) => {
    const response = await fetch("/api/v1/UserProfile/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pID, code, userProfile }),
    });
    return response.json();
};

export const generateUserProfileP = async (
    p1: string,
) => {
    const response = await fetch("/api/v1/UserProfile/generateP", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ p1 }),
    });
    return response.json();
}

export const formatUserProfileP = (jsonString: string) => {
    try {
        const p2 = JSON.parse(jsonString)
        // console.log(p2)
        const userProfileP = `**[Big 5 Personality Traits]**
The following section presents an overview of this person's personality within five key domains, showcasing their traits spectrum and the extent of their qualities in each area. Each domain comprises several facets that provide deeper insights into their unique personality traits.

1. Overall Personality Summary (Psychotherapist’s Perspective)
${p2.result[2].content}

2. Explanation in Everyday Language
${p2.result[3].content}`

        return { result: 'success', userProfileP }
    } catch (error) {
        return { result: 'error', error, userProfileP: '' }
    }
}

export const generateUserProfileV = async (
    v1: string,
) => {
    const response = await fetch("/api/v1/UserProfile/generateV", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ v1 }),
    });
    return response.json();
}

export const formatUserProfileV = (jsonString: string) => {
    try {
        const v2 = JSON.parse(jsonString)
        // console.log(p2)
        const userProfileV = `**[Life-guiding Principles]**
The information provided below is the values that reflect the relative importance this person places on different aspects of life, guiding their decisions, actions, and perspectives. These values are fundamental components of their personality and play a crucial role in shaping who this person is.

1. Overall Value Summary (Psychotherapist’s Perspective)
${v2.result[1].content}

2. Explanation in Everyday Language
${v2.result[2].content}`

        return { result: 'success', userProfileV }
    } catch (error) {
        return { result: 'error', error, userProfileV: '' }
    }
}