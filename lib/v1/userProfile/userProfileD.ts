import { demographicsOptions } from "../demographics/options"

const joinedStringList = (list: string[], sep: string) => {
    return list.join(sep)
}

const disabilityRows = (demoFormData: any) => {
    let rows = []
    let noReveal1 = "I do not have a disability or impairment"
    let noReveal2 = "Prefer not to disclose"
    let disability = demoFormData.disability
    if (!(disability.includes(noReveal1) || disability.includes(noReveal2))) {
        rows.push(`- Disability: ${joinedStringList(disability, ", ")}`)
        rows.push(`- Disability Impact: ${demoFormData.disabilityImpact}`)
    }
    return joinedStringList(rows, "\n")
}

const dualNationalityRows = (demoFormData: any) => {
    let rows = []
    let dualNationality = demoFormData.dualNationality
    if (dualNationality !== "No") {
        rows.push(`- Dual Nationality: ${dualNationality}`)
        rows.push(`- Nationality More Important: ${demoFormData.dualNationalityGreaterImportance}`)
    }
    return joinedStringList(rows, "\n")
}

const occupationRows = (demoFormData: any) => {
    let rows = []
    let occupation = demoFormData.employmentStatus
    rows.push(`- Occupation: ${occupation}`)
    if (occupation === "Student") {
        rows.push(`- Major: ${demoFormData.major}`)
    }
    let occs = demographicsOptions.employmentStatus.slice(0, 4)
    if (occs.includes(occupation)) {
        rows.push(`- Job Responsibilities: ${demoFormData.jobResponsibilities}`)
    }
    return joinedStringList(rows, "\n")

}

const householdIncome = (demoFormData: any) => {
    if (demoFormData.householdIncome === demographicsOptions.householdIncome[6]) {
        return ""
    }
    return `- Perceived Household Income: ${demoFormData.householdIncome}`
}

const socialClassRow = (demoFormData: any) => {
    if (demoFormData.socialClass === demographicsOptions.socialClass[4]) {
        return ""
    }
    return `- Perceived Social Class: ${demoFormData.socialClass}`
}
const politicalViewsRow = (demoFormData: any) => {
    if (demoFormData.politicalViews === demographicsOptions.politicalViews[5]) {
        return ""
    }
    return `- Political Affiliation: ${demoFormData.politicalViews}`
}
const religiousPreferenceRow = (demoFormData: any) => {
    if (demoFormData.religiousPreference === demographicsOptions.religiousPreference[11]) {
        return ""
    }
    return `- Religious Affiliation: ${demoFormData.religiousPreference}`
}

export const createUserProfileD = (demoFormData: any) => {
    let userProfile = `[Demographics] Demographics describe who this character is.
- Age: ${demoFormData.age}
- Sex: ${demoFormData.sexAssignedAtBirth}
- Gender: ${demoFormData.genderIdentity}
- Sexual Orientation: ${demoFormData.sexualOrientation}
- Ethnicity(Heritage): ${joinedStringList(demoFormData.ethnicOrigins, ", ")}
- Race: ${joinedStringList(demoFormData.raceIdentity, ", ")}
${disabilityRows(demoFormData)}
- Nationality: ${demoFormData.country}
${dualNationalityRows(demoFormData)}
- Residence: ${demoFormData.city}, ${demoFormData.states}
- Education: ${demoFormData.educationLevel}
${occupationRows(demoFormData)}
${householdIncome(demoFormData)}
- Subjective Family Income: ${demoFormData.familyIncome}
- Income Satisfaction: ${demoFormData.financialSituation}
${socialClassRow(demoFormData)}
- Living Style: ${joinedStringList(demoFormData.livingWith, ", ")}
${politicalViewsRow(demoFormData)}
${religiousPreferenceRow(demoFormData)}
`
    return userProfile
}