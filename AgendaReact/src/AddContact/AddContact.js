
import React, { useState } from 'react';
import './AddContact.css';

function AddContact() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { nombre, apellido, telefono };

    fetch('http://www.raydelto.org/agenda.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Contacto agregado:', data);
      setNombre('');
      setApellido('');
      setTelefono('');
      setError(null);
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Error al agregar el contacto. Por favor, inténtalo de nuevo.');
    });
  };

  return (
    <div className="add-contact-container">
      <h2>Agregar Nuevo Contacto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <button type="submit">Agregar Contacto</button>
      </form>
    </div>
  );
}

export default AddContact;
