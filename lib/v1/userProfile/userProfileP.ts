import { bfiDomains, bfiDomainsAndFacets, bfiFacets, bfiReverse } from "../survey/questions/BFI"

const bfiScoreToLevel = (score: number) => {
    if (score < 2) {
        return 'very low'
    } else if (score < 3) {
        return 'low'
    } else if (score < 4) {
        return 'slightly below average'
    } else if (score < 5) {
        return 'slightly above average'
    } else if (score < 6) {
        return 'high'
    } else if (score <= 7) {
        return 'very high'
    } else {
        return 'out of range'
    }
}

export const generatePTemplate = `You will generate increasingly synthetic, dense inference of a character's personality based on the given Big 5 personality test results. 

Step 1. Identify 1-5 key characteristics that make up this character’s personality (";" delimited). 

Step 2. Based on three characteristics per facet, infer the person's personality and provide a 5-sentence summary for each facet. 

Step 3: From a psychotherapist's perspective, analyze the summary of each facet to infer the overall personality of the individual. Provide a 10-sentence summary describing their personality traits and tendencies in one paragraph. 

Step 4: Interpret the 10-sentence personality summary in one paragraph in a way that is easy for non-professionals to understand. Explain how these personality characteristics are likely to manifest in the individual's everyday behaviors and interactions in the real world, without directly referencing the technical facet terms.  

A key characteristic is: 
- a crucial factor in forming the character’s personality, 
- relevant to the test result, 

Guidelines: 
- Make space with fusion, compression, and removal of uninformative phrases like "the report discusses". 
- The summaries should become highly dense and concise yet self-contained, i.e., easily understood without the article.`

export const generatePJSONFormat = `[JSON FORMAT]
{
    result:[
        {
            step: 1,
            title: "Key Characteristics",
            content: {content}
        },
        {
            step: 2,
            title: "5-Sentence Summaries for Each Facet",
            Extraversion: {extraversion}
            Agreeableness: {agreeableness}
            Conscientiousness: {conscientiousness}
            Negative Emotionality: {negative emotionality}
            Open-Mindedness: {open-mindedness}
        },
        {
            step: 3,
            title: "psychotherapist's perspective",
            content: {content}
        },
        {
            step: 4,
            title: {title},
            content: {content}
        }
    ]
}`


export const createUserProfileP1 = (bfiFormData: { [key: string]: string }) => {
    const domainScores = {} as { [key: string]: number }
    const facetScores = {} as { [key: string]: number }
    Object.entries(bfiDomainsAndFacets).forEach(([domain, facets]) => { // Initialize scores
        domainScores[domain] = 0
        facets.forEach(facet => {
            facetScores[facet] = 0
        })
    })
    Object.entries(bfiFormData).forEach(([key, score]) => { // Calculate scores
        const reversed = bfiReverse[key]
        const scoreNum = reversed ? 8 - parseInt(score) : parseInt(score)
        const domain = bfiDomains[key]
        const facet = bfiFacets[key]
        domainScores[domain] += scoreNum
        facetScores[facet] += scoreNum
    })

    const sentences = [] as string[]

    Object.entries(bfiDomainsAndFacets).forEach(([domain, facets]) => { // Initialize scores
        // domainScores[domain] = 0
        const domainScore = domainScores[domain] / 6
        const domainLevel = bfiScoreToLevel(domainScore)
        const domainSentence = `This character's overall tendency in the domain of ${domain} is ${domainLevel}.`
        sentences.push(domainSentence)
        facets.forEach(facet => {
            const facetScore = facetScores[facet] / 2
            const facetLevel = bfiScoreToLevel(facetScore)
            const facetSentence = `- This character has a ${facetLevel} level of ${facet}.`
            sentences.push(facetSentence)
        })
    })
    let userProfile = sentences.join('\n')
    return userProfile
}