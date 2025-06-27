export const createUserProfileC = (c2FormData: any, c4FormData: any) => {
    const userProfile = `[Top 5 Things this character loves]
1. ${c2FormData["love-1"]}
2. ${c2FormData["love-2"]}
3. ${c2FormData["love-3"]}
4. ${c2FormData["love-4"]}
5. ${c2FormData["love-5"]}

[Top 5 Things this character hates]
1. ${c2FormData["hate-1"]}
2. ${c2FormData["hate-2"]}
3. ${c2FormData["hate-3"]}
4. ${c2FormData["hate-4"]}
5. ${c2FormData["hate-5"]}

[Weekly Activities Overview]
- The following statement illustrates the character's recent activities over the past week, encompassing everyday tasks, periodic habits, and unique experiences. It depicts the character's engagement in various actions from a week ago up to the current moment, highlighting the diversity and specificity of their daily life and routines.

Character's Answer
1. A typical weekday for me starts off by """ ${c4FormData.weekday} """
2. A typical weekend for me starts off by """ ${c4FormData.weekend} """`

    return userProfile
}

export const createUserProfileC_W2 = (c2FormData: any, c4FormData: any) => {
    const userProfile = `[Top 5 Things this character loves]
1. ${c2FormData["love-1"]}
2. ${c2FormData["love-2"]}
3. ${c2FormData["love-3"]}
4. ${c2FormData["love-4"]}
5. ${c2FormData["love-5"]}

[Top 5 Things this character hates]
1. ${c2FormData["hate-1"]}
2. ${c2FormData["hate-2"]}
3. ${c2FormData["hate-3"]}
4. ${c2FormData["hate-4"]}
5. ${c2FormData["hate-5"]}

**[Weekly Activities Example]**
The following statement illustrates this person's typical weekly routine, covering daily activities from wake-up to bedtime.
1. A typical weekday for me starts off """ ${c4FormData.weekday} """
2. 2. A typical weekend for me starts off by """ ${c4FormData.weekend} """`

    return userProfile
}