import Text from "../Text";

function EssayTopicInstruction1() {
    return (
        <Text
            content="The first essay topic is <b>a brief self-introduction of you</b> that <b>AITwinBot generated</b> based on information provided earlier. Please take a moment to reflect on how you usually introduce yourself to others."
            html={true}
        />
    );
}
function EssayTopicInstruction2() {
    return (
        <Text
            content="The second essay that AITwinBot will generate is about your <b>strengths and weaknesses</b>. Please take a moment to think about your strengths and weaknesses and click Next."
            html={true}
        />
    );
}
function EssayTopicInstruction3() {
    return (
        <Text
            content="The third essay that AITwinBot will generate is about <b>'how you envision yourself and your life ten years from now.'</b> Please take a moment to think about how you will be in the future (ten years from now) and click Next."
            html={true}
        />
    );
}
function EssayTopicInstruction4() {
    return (
        <Text
            content="The fourth essay topic is about <b>what stresses you and your own ways of dealing with it</b>. Please take a moment to consider what causes you stress and how you cope with it, then click Next."
            html={true}
        />
    );
}
function EssayTopicInstruction5() {
    return (
        <Text
            content="The last essay topic is about <b>your own definition of happiness and how you strive to achieve it</b>. Please reflect on what happiness means to you and how you pursue it, then click Next."
            html={true}
        />
    );
}

export const EssayTopicInstruction = (index: string) => {
    if (index === "1") {
        return <EssayTopicInstruction1 />;
    }
    else if (index === "2") {
        return <EssayTopicInstruction2 />;
    }
    else if (index === "3") {
        return <EssayTopicInstruction3 />;
    }
    else if (index === "4") {
        return <EssayTopicInstruction4 />;
    }
    else if (index === "5") {
        return <EssayTopicInstruction5 />;
    }
    return <></>;
}