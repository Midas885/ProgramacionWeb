
import React, { useEffect, useState } from 'react';
import './ContactList.css';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://www.raydelto.org/agenda.php')
      .then(response => response.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div> 
      <table>
        <thead>
          <h2>Listado de Contactos</h2>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.nombre}</td>
              <td>{contact.apellido}</td>
              <td>{contact.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
