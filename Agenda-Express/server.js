const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const filePath = path.join(__dirname, 'contacts.txt');

app.use(bodyParser.json());
app.use(cors());

// Función para normalizar datos
function normalizeContact(contact) {
    const nombre = contact.nombre || contact.firstName || contact.first_name || "";
    const apellido = contact.apellido || contact.lastName || contact.last_name || "";
    const telefono = contact.telefono || contact.phone || contact.phoneNumber || "";

    return { nombre, apellido, telefono };
}

// Ruta para obtener contactos
app.get('/contacts', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer contactos', error: err.message });
        }
        const contacts = data ? JSON.parse(data) : [];
        res.json(contacts);
    });
});

// Ruta para agregar un nuevo contacto
app.post('/contacts', (req, res) => {
    const receivedData = req.body;
    console.log('Datos recibidos:', receivedData);  // Registro de datos recibidos
    const newContact = normalizeContact(receivedData);
    console.log('Contacto normalizado:', newContact);  // Registro de contacto normalizado

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Error al leer contactos', error: err.message });
        }
        const contacts = data ? JSON.parse(data) : [];
        contacts.push(newContact);
        fs.writeFile(filePath, JSON.stringify(contacts, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar contacto', error: err.message });
            }
            res.json(newContact);
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
