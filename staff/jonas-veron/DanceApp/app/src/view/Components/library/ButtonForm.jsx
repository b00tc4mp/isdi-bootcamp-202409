export default ({ type, children, onClick }) => {
  return (
    <button
      type={type}
      className="bg-accentpink w-52 mt-6 h-10 rounded-2xl text-white font-bold border-2 border-transparent hover:bg-accentgreen hover:border-accentpink focus:outline-none focus:ring-2 focus:ring-accentgreen transition duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

//TODO pasar a tailwind

// .Button{
//     margin: 20px auto;
//     width: 5rem;
//     height: 2em;
//     background-color: #0b9901;
//     border-radius: 15px;
//     font-weight: 700;
//     cursor: pointer;
//     color: #ffffff;
//     transition: all 0.5s ease;
// }

//     button:hover {
//         background-color: #8a051f;
//     }
