const dictionary = {
  "user not found": "No se encontró el usuario",
  "event not found": "No se encontró el evento",
  "invalid name": "El nombre ingresado no es válido",
  "invalid name length": "El nombre ingresado es demasiado largo",
  "e-mail is too long": "El e-mail ingresado es demasiado largo",
  "invalid e-mail": "El e-mail ingresado no es válido",
  "invalid email repeat": "El e-mail ingresado no es válido",
  "emails do not match": "Los e-mails deben coincidir",
  "invalid Role": "Rol seleccionado inválido",
  "invalid password": "La contraseña ingresada no es válida",
  "invalid password length": "La contraseña debe ser mayor a 8 caracteres",
  "password is too long": "La contraseña ingresada es demasiado larga",
  "invalid password repeat": "El password ingresado no es válido",
  "password is too long": "El password ingresado es demasiado largo",
  "passwords do not match": "Los passwords deben coincidir",
  "images must be an array": "Formato de imágen incorrecta",
  "each file must be a string": "Formato de imágen incorrecta",
  "invalid image": "La imagen ingresada no es válida",
  "the text is required": "El texto es requerido",
  "text cannot exceed 200 characters":
    "El texto no puede ser superior a 200 caracteres",
  "invalid text": "Formato de texto inválido",
  "invalid date format": "Formato de fecha incorrecto",
  "date must be in the future": "La fecha debe ser en el futuro",
  "date must not exceed one year from now":
    "Por favor, selecciona una fecha dentro del próximo año",
  "invalid location format": "Formato de localización inválida",
  "location must be at least 5 characters":
    "La localización debe tener al menos 5 caracteres",
  "location must not exceed 200 characters":
    "La localización no puede exceder los 200 caracteres",
  "wrong type": "Tipo de evento inválido",
  "user has not permission to create event":
    "Este usuario aún no tiene permiso para publicar",
  "user is not author of event": "No puedes borrar un evento que no es tuyo",
  "event deleted": "¡Evento borrado con éxito!",
  "comment not found": "No se encontró el comentario",
  "user not author of comment": "No puedes borrar un comentario que no es tuyo",
  "wrong credentials": "Usuario o contraseña incorrectos",
  "target user not found": "No se encontró el usuario",
  "user already exists": "Este usuario ya está registrado",
}

export default function useLiterals() {
  return function (text) {
    const translation = dictionary[text] || "Lo sentimos, ha ocurrido un error"

    return translation
  }
}
