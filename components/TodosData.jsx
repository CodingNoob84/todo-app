import React from "react";
import NewTodo from "./NewTodo";
import Completed from "./Completed";
import useFetchTodos from "@/hooks/fetchTodos";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

function onSplitArray(todos) {
  const newTodos = [];
  const completedTodos = [];
  if (todos.length > 0) {
    todos?.forEach((todo) => {
      if (todo.stage === "new") {
        newTodos.push(todo);
      } else if (todo.stage === "completed") {
        completedTodos.push(todo);
      }
    });
  }

  return { newTodos, completedTodos };
}

function TodosData({ todos, setTodos, setTodo, setTodoId }) {
  //console.log(todos);
  const { currentUser } = useAuth();
  const { newTodos, completedTodos } = onSplitArray(todos);
  //console.log(completedTodos);
  const handleCompleted = async (id, stageupdate) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          stage: stageupdate,
        };
      }
      return todo;
    });
    //console.log(updatedTodos);
    setTodos(updatedTodos);

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { todos: updatedTodos }, { merge: true });
  };
  return (
    <div className="flex flex-col justify-center items-center md:items-start gap-[10px] md:flex-row">
      {newTodos.length > 0 && (
        <NewTodo
          todos={newTodos}
          handleCompleted={handleCompleted}
          setTodo={setTodo}
          setTodoId={setTodoId}
        />
      )}
      {completedTodos.length > 0 && (
        <Completed todos={completedTodos} handleCompleted={handleCompleted} />
      )}
    </div>
  );
}

export default TodosData;
