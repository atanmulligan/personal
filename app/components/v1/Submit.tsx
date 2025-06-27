'use client';

export default function Submit({ label, onSubmit = (() => { }), active = true }: { label: string, onSubmit?: any, active?: boolean }) {
    const btnClass = "w-40 h-12 flex justify-center items-center rounded-lg border-2 uppercase"
    const btnActive = active ? "border-black bg-black text-white" : ""
    const btnHover = active ? "hover:border-black hover:bg-transparent hover:text-black" : ""
    const btnInactive = active ? "" : "border-gray-300 bg-gray-300 text-white cursor-default"

    const handleOnSubmit = () => {
        if (active) {
            onSubmit()
        }
    }

    return (
        <button
            onSubmit={handleOnSubmit}
            className={`${btnClass} ${btnActive} ${btnHover} ${btnInactive}`}
        >
            {label}
        </button>

    );
}