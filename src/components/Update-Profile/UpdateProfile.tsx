import React, {useRef, useState}   from 'react';
import {Alert, Button, Card, Form} from 'react-bootstrap';
import {Simulate}                  from 'react-dom/test-utils';
import {Link, useHistory}          from 'react-router-dom';
import {useAuth}                   from '../../Contexts/AuthContext';

function UpdateProfile() {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {updateEmail, updatePass, currentUser} = useAuth();
  
  const history = useHistory();
  
  function handleSubmit(e: any) {
    e.preventDefault();
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    const promises = []
    if(email !== currentUser.email)
      promises.push(updateEmail(email))
    
    if(password !== currentUser.password && password.length > 0)
      promises.push(updatePass(password))
    
    setLoading(true)
    setError('')
    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update account!');
      })
      .finally(() => {
        setLoading(false)
      })
    
  }
  
  return (
    <>
      <Card className = 'w-100 mt-2'>
        <Card.Body>
          <h2 className = 'text-center mb-4'>Update Profile</h2>
          {error && !loading && <Alert variant = {'danger'}>{error}</Alert>}
          <Form onSubmit = {handleSubmit}>
            <Form.Group id = 'email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type = 'email' ref = {emailRef} defaultValue = {currentUser.email}
                placeholder = {'Leave blank to keep the same'} />
            </Form.Group>
            <Form.Group id = 'password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type = 'password' ref = {passwordRef} placeholder = {'Leave blank to keep the same'} />
            </Form.Group>
            <Button type = 'submit' className = 'btn-block' disabled = {loading}>
              Update Profile
            </Button>
          </Form>
        
        </Card.Body>
      </Card>
      <div className = {' text-center'}>Need an account?
        <Link to = {'/'}>
          Back to Dashboard
        </Link>
      </div>
    </>
  );
}

export default UpdateProfile;
