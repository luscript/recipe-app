import React from 'react'
import Form from '../components/Form'
import { register } from '../services/userService';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const onSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    if(password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await register(email, password);
      if(response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registered successfully'
        })
        setTimeout(() => { {navigate('/login')} }, 1500);
      } else {
        Swal.fire(
          'Error',
          'Email already registered',
          'error'
        )
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form email={email} 
    setEmail={setEmail} 
    password={password} 
    setPassword={setPassword} 
    label="Register" 
    passwordConfirm={passwordConfirm}
    setPasswordConfirm={setPasswordConfirm}
    onSubmit={onSubmit}/>
  )
}

export default Register