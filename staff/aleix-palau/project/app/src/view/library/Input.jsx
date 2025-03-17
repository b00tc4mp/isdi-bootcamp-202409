export default function Input({ type, id }) {

    return <input
        type={type}
        id={id}
        className="w-full box-border border-2"
    />
}
// TODO: padding 0, borderless, Aumentar la altura de un textarea mientras escribes