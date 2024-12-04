import React from 'react';
import Declarations from './Declarations';

const Home = ({ userInfo }) => {
  return (
    <div>
      <div className='mb-3'> 
        <h2>Bienvenido {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'Usuario'}!</h2>
      </div>
      <Declarations isAuthenticated={true} />
    </div>
  );
};

export default Home;

