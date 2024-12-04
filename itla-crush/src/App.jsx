import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importando los modelos de firebase
import { appFirebase } from '../src/credenciales';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

// Importar los componentes 
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Home from '../src/components/Home';
import Confession from '../src/components/Confession';
import Layout from '../src/components/Layout';
import Declarations from '../src/components/Declarations'; 

function App() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        const userDoc = await getDoc(doc(db, 'users', userFirebase.uid));
        if (userDoc.exists()) {
          setUser(userFirebase);
          setUserInfo(userDoc.data());
        }
      } else {
        setUser(null);
        setUserInfo(null);
      }
    });



    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserInfo(null);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <Router>
      <Layout userInfo={userInfo} handleSignOut={handleSignOut}>
        <Routes>
          <Route path="/" element={user ? <Home userInfo={userInfo} /> : <Declarations isAuthenticated={false} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confession" element={<Confession />} />
          <Route path="/declarations" element={<Declarations isAuthenticated={true} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

