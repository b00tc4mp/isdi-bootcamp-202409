import { Loader2 } from 'lucide-react'

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-pink" />
        </div>
    )
}