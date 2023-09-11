"use client";
import {  Navbar } from "flowbite-react";
import logo from "../assets/chef-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import DropdownComponent from "./Dropdown";
import { useUserContext } from "../contexts/UserContext";

export default function NavbarWithCTAButton() {

    const { user, contextLogout, loading } = useUserContext();

  const navigate = useNavigate();

  const logout = () => {
    contextLogout();
    navigate("/login");
  };

  return (
    <Navbar fluid rounded className="nav bg-transparent">
      <div>
        <img src={logo} alt="" width={"70px"} />
      </div>
      <div className="flex md:order-2">
          {!loading && (
              <>
                  {!user ? (
                      <div>
                          <Link to="/login" className="link mr-2">
                              Login
                          </Link>
                          <Navbar.Toggle />
                      </div>
                  ) : (
                      <DropdownComponent logout={logout} userEmail={user.email} />
                  )}
              </>
          )}
      </div>
      <div>
      </div>
    </Navbar>
  );
}
