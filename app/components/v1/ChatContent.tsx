'use client';

export default function ChatContent({ content, role = true }: { content: string, role?: boolean }) {
    // true: User(You) false: Chatbot(AI TwinBot)
    const roleName = role ? "You" : "AI TwinBot"
    const coloreByRole = role ? "black" : "#E8EDF4"

    return (
        <div className="flex items-center content-center gap-[10px] flex-wrap w-full max-w-[1100px] px-[20px] py-0">
            <div className="w-8 h-8 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <circle cx="15" cy="15" r="14" fill={coloreByRole} stroke="black" />
                </svg>
            </div>

            <div className="w-[500px] text-black text-base font-bold font-['Roboto'] leading-normal">{roleName}</div>
            <div className="w-[1010px] text-black text-base font-['Roboto'] leading-normal">{content}</div>
        </div>
    );
}