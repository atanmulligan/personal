export default function LikertScaleAgree() {
    return (
        <div className="flex w-full p-8 px-12 justify-center items-center bg-white rounded-lg border-2 border-black">
            <div className="flex justify-center items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">1</div>
                <div className="text-center text-black text-base font-bold leading-normal">=</div>
                <div className="text-center text-black text-base font-bold leading-normal">strongly</div>
                <div className="text-center text-black text-base font-bold leading-normal">disagree</div>
            </div>
            <div className="flex justify-center items-center grow shrink-0 basis-0">
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
            </div>
            <div className="flex justify-center items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">4</div>
                <div className="text-center text-black text-base font-bold leading-normal">=</div>
                <div className="text-center text-black text-base font-bold leading-normal">neither agree</div>
                <div className="text-center text-black text-base font-bold leading-normal">nor disagree</div>
            </div>
            <div className="flex justify-center items-center grow shrink-0 basis-0">
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
            </div>
            <div className="flex justify-center items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">7</div>
                <div className="text-center text-black text-base font-bold leading-normal">=</div>
                <div className="text-center text-black text-base font-bold leading-normal">strongly</div>
                <div className="text-center text-black text-base font-bold leading-normal">agree</div>
            </div>
        </div>
    )
}


export function LikertScaleLike() {
    return (
        <div className="flex w-full p-8 px-12 justify-center items-center bg-white rounded-lg border-2 border-black">
            <div className="flex justify-center items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">1</div>
                <div className="text-center text-black text-base font-bold leading-normal">=</div>
                <div className="text-center text-black text-base font-bold leading-normal">not like me</div>
                <div className="text-center text-black text-base font-bold leading-normal">at all</div>
            </div>
            <div className="flex justify-center items-center grow shrink-0 basis-0">
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
            </div>
            <div className="flex justify-center items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">4</div>
                <div className="text-center text-black text-base font-bold leading-normal">=</div>
                <div className="text-center text-black text-base font-bold leading-normal">neither like</div>
                <div className="text-center text-black text-base font-bold leading-normal">nor unlike me</div>
            </div>
            <div className="flex justify-center items-center grow shrink-0 basis-0">
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
                <div className="text-black text-base font-bold leading-normal">ㆍ</div>
            </div>
            <div className="flex justify-center items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">7</div>
                <div className="text-center text-black text-base font-bold leading-normal">=</div>
                <div className="text-center text-black text-base font-bold leading-normal">very much</div>
                <div className="text-center text-black text-base font-bold leading-normal">like me</div>
            </div>
        </div>
    )
}

export function LikertScaleImportant() {
    return (
        <div className="flex flex-col w-full p-8 px-12 justify-center bg-white rounded-lg border-2 border-black gap-2">
            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">1 = Not at all important to who I am</div>
            </div>
            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">2 = Not important to who I am</div>
            </div>
            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">3 = Slightly not important to who I am</div>
            </div>
            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">4 = Neither unimportant nor important to who I am</div>
            </div>

            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">5 = Slightly important to who I am</div>
            </div>
            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">6 = Important to who I am</div>
            </div>
            <div className="flex items-center content-center gap-[5px] grow shrink-0 basis-0 flex-wrap">
                <div className="text-center text-black text-base font-bold leading-normal">7 = Extremely important to who I am</div>
            </div>
        </div>
    )
}
