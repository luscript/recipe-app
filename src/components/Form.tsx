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
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const Form = ({email, setEmail, password, setPassword, label, passwordConfirm, setPasswordConfirm, onSubmit} : FormProps) => {
    
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
      </div>
      <Button type="submit">
        { label }
      </Button>
      { label == "Login" && <p>Not an user? <Link to="/register">Register</Link></p>}
        { label !== "Login" && <p>Already an user? <Link to="/login">Login</Link></p>}
    </form>
    </div>
    
  )
}

export default Form