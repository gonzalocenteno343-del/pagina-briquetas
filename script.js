document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================================================
       1. MENÚ DE NAVEGACIÓN (Hamburguesa para Móvil)
       ============================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // 1. Alterna la clase 'active' para mostrar/ocultar el menú
            navMenu.classList.toggle('active');

            // 2. MEJORA: Actualiza el atributo para accesibilidad
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    /* ==============================================================================
       2. MENÚ DESPLEGABLE DE "PRODUCTOS"
       ============================================================================== */
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu) {
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    window.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-toggle')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });


    /* ==============================================================================
       3. FORMULARIO DE CONTACTO
       ============================================================================== */
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            status.innerHTML = "Enviando...";
            status.style.display = "block";
            status.style.color = "#007bff";

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
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! Hubo un problema al enviar tu mensaje.";
                        }
                        status.style.color = "red";
                    });
                }
            }).catch(error => {
                status.innerHTML = "Oops! Hubo un problema de conexión. Inténtalo de nuevo.";
                status.style.color = "red";
            });
        });
    }


    /* ==============================================================================
       4. MODAL DE IMAGEN
       ============================================================================== */
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeModal = document.querySelector('.modal-close');
    
    if (modal) {
        const featureImages = document.querySelectorAll('.feature img');

        featureImages.forEach(img => {
            img.addEventListener('click', function(){
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        });

        function closeModalFunction() {
            modal.style.display = 'none';
        }

        closeModal.addEventListener('click', closeModalFunction);
        modal.addEventListener('click', closeModalFunction);
    }

});