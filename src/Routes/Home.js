import React, {useEffect, useState, useContext} from "react";
import FormAddTodo from "../components/Todo/FormAddTodo";
import TodoList from "../components/Todo/TodoList";
import TodosContext from "../Context/todos";
import axios from "axios";

function Home() {

    const [loading, setLoading] = useState();
    const todoContext = useContext(TodosContext);

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

        todoContext.dispatch({type: 'init_todo', payload: {todos}})
    }
    return (
        <>
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
        </>
    )
}

export default Home;