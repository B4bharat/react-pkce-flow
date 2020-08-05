import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from '../components/AuthForm';

function SignUp() {
  return (
    <Card>
      <Logo src={'http://lorempixel.com/350/250/'} />
      <Form>
        <Input type='email' placeholder='email' />
        <Input type='password' placeholder='password' />
        <Input type='password' placeholder='password again' />
        <Button>Sign Up</Button>
      </Form>
      <Link to='/login'>Already have an account?</Link>
    </Card>
  );
}

export default SignUp;
