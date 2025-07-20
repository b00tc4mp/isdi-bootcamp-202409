export default function Form({ children, onSubmit }) {
  return <form className="Form flex justify-center items-center flex-col gap-5" onSubmit={onSubmit}>{children}</form>
}

