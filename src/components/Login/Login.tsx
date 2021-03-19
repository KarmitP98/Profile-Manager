import React, {useRef, useState}   from 'react';
import {Alert, Button, Card, Form} from 'react-bootstrap';
import {Link, useHistory}          from 'react-router-dom';
import {useAuth}                   from '../../Contexts/AuthContext';


const Login: React.FC = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  
  const history = useHistory();
  
  async function handleSubmit(e: any) {
    e.preventDefault();
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      // Pushes to dashboard page [Like Router.navigate...]
      history.push('/');
    }
    catch {
      setError('Failed to Sign in');
    }
    
    setLoading(false);
  }
  
  return (
    <>
      <Card className = 'w-100 mt-2'>
        <Card.Body>
          <h2 className = 'text-center mb-4'>Log In</h2>
          {error && !loading && <Alert variant = {'danger'}>{error}</Alert>}
          
          <Form onSubmit = {handleSubmit}>
            <Form.Group id = 'email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type = 'email' ref = {emailRef} required/>
            </Form.Group>
            <Form.Group id = 'password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type = 'password' ref = {passwordRef} required/>
            </Form.Group>
            <Button type = 'submit' className = 'w-100' disabled = {loading}>
              Log In
            </Button>
          </Form>
          <div className = 'w-100 text-center mt-3'>
            <Link to = {'/forgot-password'}>Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className = {' text-center'}>Need an account?
        <Link to = {'/signup'}>
          Sign Up
        </Link>
      </div>
    </>
  );
};
export default Login;
