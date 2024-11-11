
import React from 'react';
import ContactList from './ContactList/ContactList';
import AddContact from './AddContact/AddContact';
import './App.css'

function App() {
  return (
    <div>
      <h1 className="header">Agenda Web</h1>
      <AddContact />
      <ContactList />
    </div>
  );
}

export default App;
