import { HeartCrack } from 'lucide-react'
import { PrimaryButton } from '../library'

export default function NoMoreProfiles({ onSettingsClick }) {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="w-20 h-20 rounded-full bg-skin flex items-center justify-center mb-6">
                <HeartCrack size={36} className="text-dark-blue" />
            </div>

            <h2 className="text-2xl font-bold text-dark-blue mb-2">
                You ran out of people
            </h2>

            <p className="text-dark-blue mb-8 max-w-xs leading-snug">
                Try adjusting your settings to see more people in your area.
            </p>

            <PrimaryButton onClick={onSettingsClick} className="max-w-3xs bg-pink">
                Go to my settings
            </PrimaryButton>
        </div>
    )
}