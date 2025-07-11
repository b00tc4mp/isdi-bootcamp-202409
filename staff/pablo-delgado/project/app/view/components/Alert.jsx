export default function Alert({ message, onAccepted, onCanceled }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black border-2 border-[#006D77] p-6 rounded-lg shadow-lg w-80 text-center">
                <p className="text-lg font-semibold">{message}</p>
                <div className="mt-4 flex justify-around">
                    <button
                        onClick={onCanceled}
                        className="border border-[#006D77] text-[#006D77] hover:bg-[#e6f1f1] px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onAccepted}
                        className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Alert };
