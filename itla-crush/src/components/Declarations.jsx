import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const Declarations = ({ isAuthenticated }) => {
  const [declarations, setDeclarations] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchDeclarations = async () => {
      let q;
      if (isAuthenticated) {
        // Obtener todas las declaraciones si el usuario está autenticado
        q = query(collection(db, 'confessions'), orderBy('timestamp', 'desc'));
      } else {
        // Obtener solo las declaraciones públicas si el usuario no está autenticado
        q = query(collection(db, 'confessions'), where('isPublic', '==', true), orderBy('timestamp', 'desc'));
      }
      const querySnapshot = await getDocs(q);
      const declarationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDeclarations(declarationsList);
    };

    fetchDeclarations();
  }, [db, isAuthenticated]);

  return (
    <div className="container mt-4">
      <h2 className='mb-3'>{isAuthenticated ? 'Todas las Declaraciones de Amor' : 'Declaraciones Públicas de Amor'}</h2>
      {declarations.length === 0 ? (
        <p>No hay declaraciones para mostrar.</p>
      ) : (
        declarations.map(declaration => (
          <div key={declaration.id} className="row mb-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Para: {declaration.recipientName}</h5>
                  <p className="card-text">{declaration.body}</p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title">Autor: {declaration.author}</cite>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Declarations;
