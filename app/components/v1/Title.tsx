export default function Title({ content }: { content: string }) {

    return (
        <div className="text-center text-black text-3xl font-bold leading-10">
            {content}
        </div>
    )
}