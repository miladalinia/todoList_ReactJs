import React from "react";

const TodosContext = React.createContext({
    todos: [],
    add: () => {
    },
    done: () => {
    },
    delete: () => {
    },
    edit: () => {
    },
});

export default TodosContext;