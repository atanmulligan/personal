import { identityNames, importanceLevels } from "../survey/questions/spi"

export const createUserProfileA = (formData: { [key: string]: string }) => {
    const sentences = [
        '[Factors Shaping Identity]',
        "The following details outline the key factors contributing to this character's identity, demonstrating the significance of each element in shaping who they are.",
        ''
    ] as string[]
    Object.keys(formData).forEach((key) => {
        if (key in identityNames) {
            const identityName = identityNames[key]
            const score = formData[key]
            sentences.push(`- ${identityName} is ${importanceLevels[score]} to defining who this character is.`)
        }
    })
    const userProfile = sentences.join("\n")
    return userProfile
}