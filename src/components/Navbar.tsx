'use client';

import { Button, Navbar } from 'flowbite-react';
import logo from '../assets/libro-de-recetas.png';
import { Link } from 'react-router-dom';

export default function NavbarWithCTAButton() {
  return (
    <Navbar
      fluid
      rounded
    >
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="flex md:order-2">
        <Button className='bg-black'>
          Login
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
      <Link to="/" className='text-black text-base text-center'>Home</Link>
      <Link to="/recipes" className='text-black text-base text-center'>My recipes</Link>
      <Link to="/add-recipes" className='text-black text-base text-center'>Add recipes</Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


