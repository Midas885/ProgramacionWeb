document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    const floatingWindow = document.getElementById('floatingWindow');
    const closeBtn = document.querySelector('.close');


    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'http://www.raydelto.org/agenda.php';

    fetch(proxyUrl + targetUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(contact => {
                addContactToList(contact);
            });
        })
        .catch(error => console.error('Error al obtener contactos:', error));

  
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        const newContact = { nombre, apellido, telefono };
        
    
        fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(`Error HTTP! estado: ${response.status}, mensaje: ${err.message}`); });
            }
            return response.json();
        })
        .then(data => {
            alert('Contacto guardado correctamente.');
            addContactToList(data);
            contactForm.reset();
            window.location.reload();
        })
        .catch(error => console.error('Error al guardar contacto:', error));
    });

    function addContactToList(contact) {
        const li = document.createElement('li');
        li.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
        contactList.appendChild(li);
    }

    window.openFloatingWindow = function() {
        floatingWindow.style.display = 'flex';
    };

    window.closeFloatingWindow = function() {
        floatingWindow.style.display = 'none';
    };

    closeBtn.addEventListener('click', closeFloatingWindow);
});
