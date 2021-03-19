import React, {useRef, useState}   from 'react';
import {Alert, Button, Card, Form} from 'react-bootstrap';
import {Link, useHistory}          from 'react-router-dom';
import {useAuth}                   from '../../Contexts/AuthContext';

function ForgotPassword() {
  const emailRef: any = useRef();
  
  const [error, setError] = useState({msg: '', type: 'danger'});
  const [loading, setLoading] = useState(false);
  const {resetpassword} = useAuth();
  
  const history = useHistory();
  
  async function handleSubmit(e: any) {
    e.preventDefault();
    
    const email = emailRef.current.value;
    
    try {
      setError({msg: '', type: 'success'});
      setLoading(true);
      await resetpassword(email);
      // Pushes to dashboard page [Like Router.navigate...]
      setError({msg: 'Password reset email successfully sent.', type: 'success'});
    }
    catch {
      setError({msg: 'Looks like you don\'t exist!', type: 'danger'});
    }
    
    setLoading(false);
  }
  
  return (
    <>
      <Card className = 'w-100 mt-2'>
        <Card.Body>
          <h2 className = 'text-center mb-4'>Password Reset</h2>
          {error.msg && !loading && <Alert variant = {error.type}>{error.msg}</Alert>}
          
          <Form onSubmit = {handleSubmit}>
            <Form.Group id = 'email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type = 'email' ref = {emailRef} required/>
            </Form.Group>
            <Button type = 'submit' className = 'w-100' disabled = {loading}>
              Reset Password
            </Button>
          </Form>
          <div className = 'w-100 text-center mt-3'>
            <Link to = {'/login'}>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className = {' text-center'}>Need an account? <a href = '#'><Link to = {'/signup'}>Sign Up</Link></a></div>
    </>
  );
}

export default ForgotPassword;
