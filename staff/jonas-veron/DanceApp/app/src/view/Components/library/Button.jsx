export default ({ type, className, children, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
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
