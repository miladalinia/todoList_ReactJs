import React, {useEffect, useReducer, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Route, Switch} from "react-router-dom";

//Import Components
import Header from "./Layout/Header";
//import Contexts
import TodosContext from "../Context/todos";
import AuthContext from "../Context/auth";
//import Reducers
import AppReducer from "../Reducers/appReducer";
import axios from "axios";
import Home from "../Routes/Home";
import About from "../Routes/About";
import Contact from "../Routes/Contact";
import TodoDetails from "../Routes/TodoDetails";
import NotFound from "../Routes/NotFound";

function App() {

    const [state, dispatch] = useReducer(AppReducer, {
        todos: [],
        authenticated: false
    })


    return (
        <BrowserRouter>
            <AuthContext.Provider value={{
                authenticated: state.authenticated,
                dispatch
            }}>
                <TodosContext.Provider value={{
                    todos: state.todos,
                    dispatch
                    // todos: this.state.todos,
                    // done: this.toggleTodo.bind(this),
                    // delete: this.deleteTodo.bind(this),
                    // edit: this.editTodo.bind(this),
                    // add: this.addTodo.bind(this)
                }}>
                    <div className="App">
                        <Header/>
                        <main>
                            {/*When using the Switch Component, the parameter URL must contain the last path */}
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/about" component={About}/>
                                <Route path="/contact" component={Contact}/>
                                {/*is last because it has parameter*/}
                                <Route path="/todos/:id" component={TodoDetails}/>
                                <Route path="/404" component={NotFound}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </main>
                    </div>
                </TodosContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    )
}

export default App;