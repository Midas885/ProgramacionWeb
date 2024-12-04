import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../credenciales'; 
import { doc, setDoc } from 'firebase/firestore'; 
import Imagen from '../assets/interface.png';
import profile from '../assets/profile.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores anteriores
    
    // Validaciones
    if (!email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Almacenar firstName y lastName en Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email
      });

      console.log('Usuario creado y datos almacenados en Firestore:', user);
      navigate('/login');
    } catch (error) {
      setError('Error creando usuario: ' + error.message);
      console.error('Error creando usuario:', error);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center mt-4'>
        <div className='row w-100'>
            <div className='col-md-6 d-flex justify-content-center'>
                <div className='father'>
                    <div className='card card-body shadow-lg'>
                        <img src={profile} alt="" className='profile mb-4'/>
                        <form onSubmit={handleSignUp}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombre" required className='inputs mb-3'/>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Apellido" required className='inputs mb-3'/>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required className='inputs mb-3'/>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required className='inputs mb-3'/>
                            <button className='ibtn' type="submit">Crear Cuenta</button>
                        </form>
                        <h4 className='text mt-3'>¿Ya tienes una cuenta?
                          <Link to="/login">
                            <button className='rbtn'>Inicia Sesión!</button>
                          </Link>
                        </h4>
                    </div>
                </div>
            </div> 
            <div className='col-md-6 d-flex justify-content-center align-items-center'> 
                <img src={Imagen} alt="" className='tamaño-imagen'/>
            </div>
        </div>
    </div>
  );
};

export default SignUp;
