import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import  {AxiosResponse} from 'axios';


interface FormProps { 
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  label: string;
  passwordConfirm?: string;
  setPasswordConfirm?: (passwordConfirm: string) => void;
  newPassword?: string;
  setNewPassword?: (newPassword: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const Form = ({email, setEmail, password, setPassword, label, passwordConfirm, setPasswordConfirm, newPassword,setNewPassword, onSubmit} : FormProps) => {
    
  const emailRegexPattern = '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b';

    
    return (
    
        
        <div className='flex flex-col items-center mt-10 flex-grow'>
        <h1 className='text-center mt-10 text-4xl'>{ label }</h1>

        <form className="flex w-80 flex-col gap-4 m-8" onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Your email"
            className='text-white'
          />
        </div>
        <TextInput
          id="email1"
          placeholder="name@example.com"
          required
          type="email"
          pattern={emailRegexPattern}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Your password"
            className='text-white'          
          />
        </div>
        <TextInput
          id="password1"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        { label == "Register" && <div>
        <div className="mb-2 block mt-2">
          <Label
            htmlFor="password2"
            value="Repeat password"
            className='text-white'          
          />
        </div>
        <TextInput
          id="password2"
          required
          type="password"
          onChange={(e) => setPasswordConfirm?.(e.target.value)}
        />
          </div>}
      { label == "Recover Password" &&  <div>
        <div className="mb-2 block mt-2">
          <Label
            htmlFor="password2"
            value="New Password"
            className='text-white'          
          />
        </div>
        <TextInput
          id="password2"
          required
          type="password"
          onChange={(e) => setNewPassword?.(e.target.value)}
        />
          </div>}
      </div>
      <Button type="submit">
        { label }
      </Button>
        { label === "Login" && (
            <div className="w-80 text-right mt-6 mb-2">
              <Link to="/recover" className="text-sm text-white underline block">Forgot password?</Link>
            </div>
          )}
      { label == "Login" && <p className="mt-4">Not an user? <Link to="/register" className="underline ml-1">Register</Link></p>}
        { label == "Register" && <p className="mt-4">Already an user? <Link to="/login" className="underline ml-1">Login</Link></p>}
        {label != "Login" && <p className="mt-4">Back to <Link to="/login" className="underline ml-1">Login</Link></p>}
    </form>
    </div>
    
  )
}

export default Form