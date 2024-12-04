import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Imagen from '../assets/interface.png';
import profile from '../assets/profile.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado');
      navigate('/');
    } catch (error) {
      setError('Error iniciando sesión correo o contraseña incorrecto');
      console.error('Error iniciando sesión:', error);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center mt-4'>
        <div className='row w-100'>
            <div className='col-md-6 d-flex justify-content-center'>
                <div className='father'>
                    <div className='card card-body shadow-lg'>
                        <img src={profile} alt="" className='profile mb-4'/>
                        <form onSubmit={handleLogin}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresar correo" required className='inputs mb-3' />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresar contraseña" required className='inputs mb-3' />
                            <button className='ibtn' type="submit">Iniciar Sesión</button>
                        </form>
                        
                        <h4 className='text mt-3'>¿No tienes una cuenta?
                            <Link to="/signup">
                                <button className='rbtn'>Registrarse!</button>
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

export default Login;
