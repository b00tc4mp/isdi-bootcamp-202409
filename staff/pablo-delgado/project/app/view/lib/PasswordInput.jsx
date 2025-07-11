import { useState } from 'react';
import Input from './Input';
import { OpenedEyeIcon, ClosedEyeIcon } from '../icons';

export default function PasswordInput({ id, name, placeholder }) {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible(prev => !prev);

    return (
        <div className="relative w-full">
            <Input
                type={visible ? 'text' : 'password'}
                id={id}
                name={name}
                placeholder={placeholder}
                className="pr-10"
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
                <span className="w-5 h-5 text-gray-600">
                    {visible ? (
                        <OpenedEyeIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                        <ClosedEyeIcon className="w-5 h-5 text-gray-600" />
                    )}
                </span>
            </button>
        </div>
    );
}
