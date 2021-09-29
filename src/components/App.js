import React, {useEffect, useReducer, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

//Import Components
import Header from "./Layout/Header";
import FormAddTodo from "./Todo/FormAddTodo";
import TodoList from "./Todo/TodoList";
//import Contexts
import TodosContext from "../Context/todos";
import AuthContext from "../Context/auth";
//import Reducers
import AppReducer from "../Reducers/appReducer";
import axios from "axios";

function App() {

    const [state, dispatch] = useReducer(AppReducer, {
        todos: [],
        authenticated: false
    })

    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get('https://reacttestapi-3ba14-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json')
            .then(response => console.log(jsonHandler(response.data)))
            .catch(err => console.log(err));
    }, []);

    let jsonHandler = (data) => {
        setLoading(false);

        let todos = Object
            .entries(data)
            .map(([key, value]) => {
                return {
                    ...value,
                    key
                }
            });

        dispatch({type: 'init_todo', payload: {todos}})
    }

    return (
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
                        <section className="container-fluid text-sm-center p-5 bg-light">
                            <div className="container d-flex flex-column align-items-center">
                                <h1 className="jumbotron-heading">Welcome!</h1>
                                <p className="lead text-muted">To get started, add some items to your list:</p>
                                <FormAddTodo/>
                            </div>
                        </section>
                        <div className="todosList">
                            <div className="container">
                                <div className="d-flex flex-column align-items-center">
                                    {
                                        loading
                                            ? <h2>Loading data ...</h2>
                                            : (
                                                <TodoList/>
                                            )
                                    }
                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </TodosContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;