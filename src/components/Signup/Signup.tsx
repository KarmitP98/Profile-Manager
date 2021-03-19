import React, {useRef, useState}   from 'react';
import {Alert, Button, Card, Form} from 'react-bootstrap';
import {Link, useHistory}          from 'react-router-dom';
import {useAuth}                   from '../../Contexts/AuthContext';
import styles                      from './Signup.module.scss';

const Signup: React.FC = () => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const passwordConfirmRef: any = useRef();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {signup} = useAuth();
  const history = useHistory();
  
  async function handleSubmit(e: any) {
    e.preventDefault();
    
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;
    
    if (password !== passwordConfirm) {
      return setError('Passwords do not match!');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password, passwordConfirm);
      history.push('/');
    }
    catch {
      setError('Failed to create an account!');
    }
    
    setLoading(false);
  }
  
  return (
    <>
      <Card className = 'w-100 mt-2'>
        <Card.Body>
          <h2 className = 'text-center mb-4'>Sign Up</h2>
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
            <Form.Group id = 'password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type = 'password' ref = {passwordConfirmRef} required/>
            </Form.Group>
            <Button type = 'submit' className = 'w-100' disabled = {loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className = {styles.Signup + ' text-center'}>Already have an account?
        <Link to = {'/login'}>
          Login
        </Link>
      </div>
    </>
  );
};
export default Signup;
