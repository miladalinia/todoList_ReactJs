import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function TodoDetails(props) {
    const params = useParams();
    const [todo, setTodo] = useState({});
    const [loading, setLoading] = useState();

    useEffect(() => {
        setLoading(true)
        axios.get(`https://reacttestapi-3ba14-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${params.id}.json`)
            .then(response => {
                setLoading(false);
                setTodo({...response.data, key: params.id});
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {
                        loading
                            ?
                            <h2>Loading Data</h2>
                            : (
                                <>
                                    <h2>Todo detail Page</h2>
                                    <p>{todo.text}</p>
                                    <span
                                        className={`badge ${todo.done ? 'bg-success' : 'bg-warning'}`}>{todo.done ? 'done' : 'undone'}</span>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )

}

export default TodoDetails;