export default function Text({ content, html = false }: { content: string, html?: boolean }) {
    if (html) {
        return (
            <div
                className="text-black text-base font-normal leading-normal text-left"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        )
    }
    return (
        <div className="text-black text-base font-normal leading-normal text-left">
            {content}
        </div>
    )
}