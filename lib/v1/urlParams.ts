const defaultUser = 'testuser'

export const getPID = (query: any) => {
    let pID = query.get('pID') as string;
    if (!pID) {
        pID = defaultUser
    }
    return pID
}

export const defaultCondition = "W1"
export const conditions = ["W1", "W2"]
export const conditionDesc = {
    "W1": "Within D, DPV, DPVC, and DPVCA",
    "W2": "Within D(S), PV(P), C, and DPVC(SPC)"
}

export const generateProlificCODE = () => {
    let code = "" as string
    for (let i = 0; i < 4; i++) {
        code += Math.random().toString(36).substr(2, 4).toUpperCase()
        if (i < 3) {
            code += "-"
        }
    }
    return code
}