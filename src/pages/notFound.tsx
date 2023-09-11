import React from 'react'
import "../styles/global.css";
const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full title mt-10">
            <h1 className="title">Error 404</h1>
            <p>Page not found</p>
            <img src="src/assets/404-error.png" alt="error"/>
        </div>
    )
}
export default NotFound
