import React from 'react'
import Form from '../components/Form'
import {useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../services/userService.tsx';
import {useUserContext} from "../contexts/UserContext.tsx";

export const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const navigate = useNavigate();
  const location = useLocation();
  const { contextLogin } = useUserContext();






   const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await login(email, password);
         if(response.status === 200) {
          localStorage.setItem('token', response.data.token);
          await Toast.fire({
              icon: 'success',
              title: 'Signed in successfully'
          })
             contextLogin();
             navigate(location.state?.previousUrl || '/');
          return;
        }
        await Swal.fire(
            'Error',
            'Invalid credentials',
            'error'
        )
      } catch(err) {
        console.log(err);
      }
  }

  return (
    <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>
  )
}

export default Login