const createShuffledOrder = (pID: string, condition: string) => {
    if (condition === "W1") {
        const essayOrder = ['D', 'DPV', 'DPVC', 'DPVCA'];
        const shuffledOrders = []
        for (let i = 0; i < 5; i++) {
            shuffledOrders.push({
                pID,
                essayNumber: i + 1,
                order: essayOrder.sort(() => Math.random() - 0.5),
            });
        }
        return shuffledOrders;
    } else if (condition === "W2") {
        const essayOrder = ['D', 'PV', 'C', 'DPVC'];
        const shuffledOrders = []
        for (let i = 0; i < 5; i++) {
            shuffledOrders.push({
                pID,
                essayNumber: i + 1,
                order: [...essayOrder].sort(() => Math.random() - 0.5),
            });
        }
        return shuffledOrders;


    }
}

const findEssayOrderByPID = async (pID: string) => {
    const response = await fetch("/api/v1/EssayOrder/find", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pID }),
    });
    return response.json();
}

export const createEssayOrderUnlessExist = async (pID: string, condition: string) => {
    try {
        const essayOrders = await findEssayOrderByPID(pID);
        if (essayOrders.result !== "success") {
            throw new Error("Error finding essayOrder data by pID");
        }
        if (essayOrders.essayOrders.length === 0) { // if no essayOrder found
            const response = await fetch("/api/v1/EssayOrder/createOrders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orders: createShuffledOrder(pID, condition) }),
            });
            console.log("Create New Essay Order")
            return response.json();
        } else { // if essayOrder found
            console.log("Essay Order Already Exist")
            return { result: "success", essayOrder: essayOrders.essayOrders }
        }
    } catch (error) {
        console.log(error)
        return { result: "error", error }
    }
}

export const findOneEssayOrder = async (pID: string, essayNumber: string) => {
    const parsedEssayNumber = parseInt(essayNumber);
    const response = await fetch("/api/v1/EssayOrder/findOne", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pID, essayNumber: parsedEssayNumber }),
    });
    return response.json();
}