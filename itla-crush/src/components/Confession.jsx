import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Confession = () => {
  const [recipient, setRecipient] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setPublic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchUsers = async () => { 
      const user = auth.currentUser; 
      const querySnapshot = await getDocs(collection(db, 'users')); 
      setUsers(querySnapshot.docs 
        .map(doc => ({ id: doc.id, ...doc.data() })) 
        .filter(u => u.email !== user?.email));
    }; 
    fetchUsers(); 
  }, [db, auth]);

  const handleRecipientChange = (e) => {
    const selectedRecipient = e.target.value;
    setRecipient(selectedRecipient);
    if (selectedRecipient === 'OTRO') {
      setRecipientName('');
    } else {
      const selectedUser = users.find(user => user.email === selectedRecipient);
      setRecipientName(selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    try {
      await addDoc(collection(db, 'confessions'), {
        recipient,
        recipientName,
        body,
        isPublic,
        author: isAnonymous ? 'Anónimo' : user?.email || 'Desconocido',
        timestamp: new Date() 
      });
      console.log('Declaración enviada');
      navigate('/');
    } catch (error) {
      console.error('Error enviando declaración:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div>
          <div className='card card-body shadow-lg'>
            <h3 className='text-center'>Confesión de Amor</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='recipient' className='form-label'>Destinatario</label>
                <select
                  id='recipient'
                  value={recipient}
                  onChange={handleRecipientChange}
                  className='form-select'
                  required
                >
                  <option value=''>Selecciona el destinatario</option>
                  {users.map(user => (
                    <option key={user.id} value={user.email}>{user.firstName} {user.lastName}</option>
                  ))}
                  <option value='OTRO'>OTRO</option>
                </select>
              </div>
              {recipient === 'OTRO' && (
                <div className='mb-3'>
                  <label htmlFor='otherRecipient' className='form-label'>Especifica el nombre</label>
                  <input
                    id='otherRecipient'
                    type='text'
                    value={recipientName}
                    placeholder='Nombre del destinatario'
                    onChange={(e) => setRecipientName(e.target.value)}
                    className='form-control'
                    required
                  />
                </div>
              )}
              <div className='mb-3'>
                <label htmlFor='body' className='form-label'>Declaración</label>
                <textarea
                  id='body'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='Escribe tu declaración'
                  className='form-control'
                  required
                ></textarea>
              </div>
              <div className='mb-3 form-check'>
                <input
                  id='isPublic'
                  type='checkbox'
                  checked={isPublic}
                  onChange={(e) => setPublic(e.target.checked)}
                  className='form-check-input'
                />
                <label htmlFor='isPublic' className='form-check-label'>Declaración pública</label>
              </div>
              <div className='mb-3 form-check'>
                <input
                  id='isAnonymous'
                  type='checkbox'
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className='form-check-input'
                />
                <label htmlFor='isAnonymous' className='form-check-label'>Anónimo</label>
              </div>
              <button type='submit' className='btn btn-primary w-100'>Enviar Declaración</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confession;
