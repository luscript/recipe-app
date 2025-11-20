import React, { useState } from 'react';
import '../styles/dropdown.css'
import avatarImage from '../assets/user.png';
import user from '../assets/usuario.png';
import home from '../assets/casa.png';
import fork from '../assets/tenedor.png';
import add from '../assets/boton-agregar.png';
import logoutimg from '../assets/cerrar-sesion.png';
import { Link } from 'react-router-dom';

const DropdownComponent = ({logout, userEmail}: {logout: () => void, userEmail: string | null}) => {
  const [menuActive, setMenuActive] = useState(false);


  React.useEffect(() => {

    const closeMenuOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.menu') && !target.closest('.profile')) {
        setMenuActive(false);
      }
    };

    document.addEventListener('click', closeMenuOnOutsideClick);
   }, [])

  const menuToggle = () => {
    setMenuActive(!menuActive);
  };



  return (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        <img src={avatarImage} alt="Avatar"/>
      </div>
      <div className={`menu ${menuActive ? 'active' : ''}`}>
       <h3>{userEmail}</h3>
        <ul>
            <li>
                <img src={home} alt="" width={'30px'}/>
                <Link to="/">Home</Link>
            </li>
          <li>
            <img src={user} alt="" />
            <Link to="/profile">My profile</Link>
          </li>
          <li>
            <img src={fork} alt="" />
            <Link to="/recipes">My recipes</Link>
          </li>
          <li>
            <img src={add} alt="" />
            <Link to="/add-recipes">Add recipe</Link>
          </li>
          <li>
            <img src={logoutimg} alt="" />
            <button className="link-button" onClick={() => logout()}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownComponent;
