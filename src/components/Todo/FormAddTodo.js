import React, {useContext, useState} from 'react'
import TodosContext from "../../Context/todos";


function FormAddTodo(props) {

    const [text, setText] = useState('')

    const todosContext = useContext(TodosContext);

    let formHandler = e => {
        e.preventDefault();
        todosContext.add(text);
        setText('');
    }

    let inputHandler = e => setText(e.target.value);

    return (
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
}

export default FormAddTodo;