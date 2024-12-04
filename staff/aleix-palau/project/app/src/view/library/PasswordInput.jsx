import Input from './Input'

export default function PasswordInput({ type, id }) {

    return <Input
        type={type}
        id={id}
        className="w-full box-border border-2"
    />
}