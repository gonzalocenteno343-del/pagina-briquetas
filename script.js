document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});
//Eso estaba en el producto//
const toggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    toggle.onclick = () => navMenu.classList.toggle('active');

    //Esto estaba en contactenos//
    
    window.addEventListener("DOMContentLoaded", function() {
      // Obtener el formulario y el div de estado
      const form = document.getElementById("contact-form");
      const status = document.getElementById("form-status");

      // Escuchar el evento de envío del formulario
      form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío normal del formulario
        status.innerHTML = "Enviando..."; // Mensaje mientras se envía
        status.style.display = "block";
        status.style.color = "#007bff";

        // Crear una petición para enviar los datos del formulario
        const data = new FormData(event.target);
        
        fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
              'Accept': 'application/json'
          }
        }).then(response => {
          if (response.ok) {
            status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado con éxito.";
            status.style.color = "green";
            form.reset(); // Limpiar los campos del formulario
          } else {
            response.json().then(data => {
              if (Object.hasOwn(data, 'errors')) {
                status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
              } else {
                status.innerHTML = "Oops! Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.";
              }
              status.style.color = "red";
            })
          }
        }).catch(error => {
          status.innerHTML = "Oops! Hubo un problema de conexión. Inténtalo de nuevo.";
          status.style.color = "red";
        });
      });
    });

    /* ==============================================================================
   FUNCIONALIDAD PARA EL MODAL DE IMAGEN
   Gonzalo: Este código hace que al hacer clic en una imagen de característica,
   se abra en grande.
   ============================================================================== */

// Esperamos a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionamos todos los elementos necesarios
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal-close');
    
    // 2. Seleccionamos todas las imágenes DENTRO de las características
    const featureImages = document.querySelectorAll('.feature img');

    // 3. A cada una de esas imágenes, le añadimos un evento de clic
    featureImages.forEach(img => {
        img.addEventListener('click', function(){
            modal.style.display = 'block'; // Muestra la ventana modal
            modalImg.src = this.src;       // Pone la imagen clickeada dentro del modal
        });
    });

    // 4. Función para cerrar el modal
    function closeModalFunction() {
        modal.style.display = 'none';
    }

    // Cierra el modal si se hace clic en la 'X'
    closeModal.addEventListener('click', closeModalFunction);

    // Cierra el modal si se hace clic en el fondo oscuro
    modal.addEventListener('click', closeModalFunction);
});