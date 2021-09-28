import React, {useContext, useState} from 'react'
import TodosContext from "../../Context/todos";
import axios from "axios";
import AuthContext from "../../Context/auth";


function FormAddTodo(props) {

    const [text, setText] = useState('')

    const todosContext = useContext(TodosContext);
    const authContext = useContext(AuthContext);


    let formHandler = e => {
        e.preventDefault();
        //ajax
        if (text.length > 1) {
            let todo = {
                text: text,
                done: false
            }
            axios.post('https://reacttestapi-3ba14-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json', todo)
                .then(response => todosContext.dispatch({
                    type: 'add_todo',
                    payload: {todo: {...todo, key: response.data.name}}
                }))
                .catch(err => console.log(err))

            // todosContext.dispatch({type: 'add_todo', payload: {text}});
            setText('');
        }
    }

    let inputHandler = e => setText(e.target.value);

    return (
        <>
            {
                authContext.authenticated
                    ? (
                        <form className="row" onSubmit={formHandler}>
                            <div className="col-md-8">
                                <input type="text" className="form-control mx-sm-3" value={text}
                                       onChange={inputHandler}
                                       placeholder="i want to do ..."/>
                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-primary">add</button>
                            </div>
                        </form>
                    )
                    : <p>You must be login</p>
            }
        </>
    )
}

export default FormAddTodo;