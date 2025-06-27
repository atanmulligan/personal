import { pvqCategories, pvqCategoryKeys } from "../survey/questions/PVQ"

export const createUserProfileV1 = (pvqFormData: { [key: string]: string }) => {
    const categoryScores = {} as { [key: string]: number[] }
    pvqCategoryKeys.forEach((category) => {
        categoryScores[category] = []
    })

    Object.entries(pvqFormData).forEach(([key, score]) => { // Calculate scores
        const category = pvqCategories[key]
        if (category in categoryScores) { // Check if category exists (excludes attention-check)
            categoryScores[category].push(parseInt(score))
        }
    })
    const sentences = [] as string[]
    Object.entries(categoryScores).forEach(([category, scores]) => {
        const categoryScore = scores.reduce((a, b) => a + b, 0) / scores.length
        if (categoryScore <= 2) {
            sentences.push(`- ${category} is of minimal importance to this character, rarely influencing their decisions or behaviors.`)
        } else if (categoryScore <= 3) {
            sentences.push(`- ${category} holds some importance but are not primary drivers of this character's actions.`)
        } else if (categoryScore <= 4) {
            sentences.push(`- This character considers ${category} somewhat important, but ${category} may not consistently guide this character's daily choices.`)
        } else if (categoryScore <= 5) {
            sentences.push(`- ${category} is important to this character and often influences their decisions and how they interact with the world.`)
        } else if (categoryScore <= 6) {
            sentences.push(`- This character places a high level of importance on ${category}, and ${category} significantly influences this character's life choices and behaviors.`)
        } else if (categoryScore <= 7) {
            sentences.push(`- ${category} is of utmost importance and is central to this character's life. ${category} guides their actions, decisions, and priorities.`)
        } else {
            sentences.push(`${category}: Score not in the expected range.`)
        }
    })
    const userProfile = sentences.join('\n')
    return userProfile
}

export const generateVTemplate = `You will generate a detailed inference of a character's values based on the given Portrait Values Questionnaire (PVQ) test results.

Step 1. Identify 1-5 key characteristics that define this character’s values (";" delimited).

Step 2. From a psychotherapist's perspective, analyze the test results to describe the overall values of the individual in 5 sentences, one paragraph.

Step 3: Translate the 5-sentence summary into an explanation that is easy for non-professionals to understand in one paragraph. Describe how these values are likely to influence the individual's everyday behaviors and interactions in the real world, **explaining how this character might act in day-to-day situations** without directly referencing technical terms.


A key characteristic is:
- a crucial factor in forming the character’s values.
- relevant to the test result.

Guidelines:
- Make space with fusion, compression, and removal of uninformative phrases like "the report discusses".
- The summaries should become highly dense and concise yet self-contained, i.e., easily understood without the article.

Values Assessment Report:

This report provides insights into the values that influence this character's behavior, actions, and life priorities.

Summary of Values:`

export const generateVJSONFormat = `[JSON FORMAT]
{
    result:[
        {
            step: 1,
            title: "Key Characteristics",
            content: {content}
        },
        {
            step: 2,
            title: "psychotherapist's perspective",
            content: {content}
        },
        {
            step: 3,
            title: {title},
            content: {content}
        }
    ]
}`
