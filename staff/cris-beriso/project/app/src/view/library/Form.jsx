export default function Form({ children, onSubmit }) {
  console.log('Form -> render')

  return <form className="Form flex justify-center items-center flex-col gap-5" onSubmit={onSubmit}>{children}</form>
}

