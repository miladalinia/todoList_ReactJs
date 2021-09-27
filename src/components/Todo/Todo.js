import React, {useState, useContext} from "react";
import EditTodo from "./EditTodo";
import TodosContext from "../../Context/todos";
import axios from "axios";

function Todo(props) {
    const {item} = props;
    const [edit, setEdit] = useState(false);

    const todosContext = useContext(TodosContext);

    let editHandler = text => {
        todosContext.dispatch({type: 'edit_todo', payload: {key: item.key, text}})
        setEdit(false);
    }

    let deleteHandler = e => {
        // ajax
        axios.delete(`https://reacttestapi-3ba14-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${item.key}.json`)
            .then(response => {
                console.log(response.data);
                todosContext.dispatch({type: 'delete_todo', payload: {key: item.key}})
            }).catch(err => console.log(err));
    }

    return (
        <>
            {
                edit === false
                    ? (
                        <div className="col-6 mb-2">
                            <div className="d-flex justify-content-between align-items-center border rounded p-3">
                                <div>
                                    {item.text}
                                </div>
                                <div>
                                    <button type="button"
                                            className={`btn btn-sm m-lg-1 ${item.done ? 'btn-secondary' : 'btn-success'}`}
                                            onClick={() => todosContext.dispatch({
                                                type: 'toggle_todo',
                                                payload: {key: item.key}
                                            })}>{item.done ? 'undone' : 'done'}
                                    </button>
                                    <button type="button" className="btn btn-info btn-sm"
                                            onClick={() => setEdit(true)}>edit
                                    </button>
                                    <button type="button" className="btn btn-danger btn-sm m-lg-1"
                                            onClick={deleteHandler}>delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    : <EditTodo text={item.text} edit={editHandler}/>
            }
        </>
    )
}

export default Todo;