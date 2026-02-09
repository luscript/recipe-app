import React from 'react';
import Form from '../components/Form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getToken } from '../utils/getToken';
import axios from 'axios';

const Recover = () => {

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [newPassword, setNewPassword] = React.useState('');

    const changePasswordFetch = async () => {
      const url = 'http://localhost:3001/api/user/change-password';
      // Backend accepts two flows:
      // - Authenticated: only { newPassword } and Authorization header (server uses authenticated email)
      // - Unauthenticated: { email, currentPassword, newPassword }
      const body: any = { newPassword: newPassword };
      if (email) body.email = email;
      if (password) body.currentPassword = password;

      const headers = { 'Content-Type': 'application/json', ...getToken() };

      const res = await axios.put(url, body, { headers: headers });
      return res.data;
    }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await changePasswordFetch();
        await Swal.fire({
        icon: 'success',
        title: 'Password changed successfully'
        });
        setPassword('');
        setNewPassword('');
        setEmail('');
    } catch(err: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Error changing password',
            text: err.response?.data?.message || 'Please try again later.'
        });
    }
  }
  
  return (
    <Form email={email} setEmail={setEmail} password={password} setPassword={setPassword} newPassword={newPassword} setNewPassword={setNewPassword} label="Recover Password" onSubmit={onSubmit}/>
  );
};

export default Recover;
