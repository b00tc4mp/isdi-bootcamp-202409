    // Alerta de los enlaces 
    function mostrarAlerta(){
        alert("¡Has hecho click en el enlace!")
    }
    // Validacion del formulario del campo numerico
    function ValidarCampoNumerico(){
      var campo = document.getElementById("numero");
      var valor = campo.value.toString();
      var longitud = valor.length;
      if (longitud < 9 || longitud > 9) {
        alert("El campo numérico debe tener 9 caracteres.");
        return false;
    }
    }
    // funcion para desaparecer los enlaces
    function accion(){
        console.log("esta funcionando mi boton");
        var ancla = document.getElementsByClassName("nav-enlace");
        for(var i = 0; i < ancla.length; i++){
        ancla[i].classList.toggle('desaparece')
        }
        }
    // funcion para hacer scroll to view
    function scrollToSection(sectionId) {
      var section = document.getElementById(sectionId);
      section.scrollIntoView({ behavior: 'smooth', block:'start'});
    }