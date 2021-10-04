import React, {useContext} from 'react'
import TodosContext from "../../Context/todos";
import AuthContext from "../../Context/auth";
import {NavLink} from "react-router-dom";


function Header() {
    const todosContext = useContext(TodosContext);
    const authContext = useContext(AuthContext);

    let doLogin = () => authContext.dispatch({type: 'login_user'});
    let doLogout = () => authContext.dispatch({type: 'logout_user'});

    return (
        <header>
            <div className="navbar navbar-dark navbar-expand-md bg-dark shadow-sm">
                <div className="container d-flex justify-content-between">
                    <a href="#" className="navbar-brand d-flex align-items-center">
                        <strong>Todo App</strong>
                    </a>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" exact activeStyle={{
                                color: 'yellow'
                            }}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={{
                                pathname: '/about',
                                search: '?name=milad',
                                hash: '#myPage'
                            }} className="nav-link">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link">Contact</NavLink>
                        </li>
                    </ul>
                    {
                        !authContext.authenticated
                            ? <button className="btn btn-sm btn-success" onClick={doLogin}>login</button>
                            : <button className="btn btn-sm btn-danger" onClick={doLogout}>logout</button>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;