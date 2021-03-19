import React, {useEffect, useState} from 'react';
import {Alert, Card, Navbar}        from 'react-bootstrap';
import {Link, useHistory}           from 'react-router-dom';
import {useAuth}                    from '../../Contexts/AuthContext';
// @ts-ignore

const Dashboard: React.FC = () => {
  const {currentUser, logout} = useAuth();
  const [error, setError] = useState('');
  const history = useHistory();
  
  
  const logoutHandler = async () => {
    
    setError('');
    
    try {
      await logout();
      history.push('/login');
    }
    catch (e) {
      setError('Cannot logout user!!!');
    }
    
  };
  
  
  return (
    <div className = 'w-100 h-100'>
      <Navbar variant = {'dark'} fixed = 'top'>
        <button className = 'btn badge-danger' onClick = {logoutHandler}>Logout</button>
      </Navbar>
      <Card>
        <Card.Header>
          <Card.Title>
            <h1>Welcome</h1>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <h2 className = 'text-center mb-4'>Profile</h2>
          {error && <Alert variant = 'danger'>{error}</Alert>}
          <h3><strong>Emial: </strong>{currentUser?.email}</h3>
          <Link to = {'/update-profile'}>
            <button className = 'btn btn-primary btn-block'>Update Profile</button>
          </Link>
        
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
