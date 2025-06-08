import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
    id,
    placeholder,
    disabled = false,
    required = false,
    className = ''
}) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                id={id}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`
                    w-full
                    p-3
                    pr-10
                    bg-lightest
                    border-2
                    border-skin
                    rounded-lg
                    text-dark-blue
                    placeholder-dark-blue/50
                    outline-none
                    focus:border-pink
                    transition-colors
                    disabled:opacity-60
                    ${className}
                `}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dark-blue/60 transition-colors"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    )
}