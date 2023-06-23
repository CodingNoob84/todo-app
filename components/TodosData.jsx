import React, { useEffect } from "react";
import NewTodo from "./NewTodo";
import Completed from "./Completed";
import useFetchTodos from "@/hooks/fetchTodos";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Deleted from "./Deleted";

function onSplitArray(todos) {
  //console.log(todos);
  const newTodos = [];
  const completedTodos = [];
  const deletedTodos = [];
  if (todos.length > 0) {
    todos?.forEach((todo) => {
      if (todo.stage === "new") {
        newTodos.push(todo);
      } else if (todo.stage === "completed") {
        completedTodos.push(todo);
      } else if (todo.stage === "deleted") {
        deletedTodos.push(todo);
      }
    });
  }
  newTodos.sort((a, b) => b.datetime.seconds - a.datetime.seconds);
  completedTodos.sort((a, b) => b.datetime.seconds - a.datetime.seconds);
  deletedTodos.sort((a, b) => b.datetime.seconds - a.datetime.seconds);

  return { newTodos, completedTodos, deletedTodos };
}

function deleteExpiredItems(array) {
  const currentTime = new Date();

  const updatedTodos = array.filter((todo) => {
    if (
      todo.stage === "deleted" &&
      todo.datetime &&
      todo.datetime.hasOwnProperty("seconds")
    ) {
      const todoTime = new Date(
        todo.datetime.seconds * 1000 + todo.datetime.nanoseconds / 1000000
      );
      const timeDifferenceInMilliseconds = currentTime - todoTime;
      const timeDifferenceInHours = Math.floor(
        timeDifferenceInMilliseconds / (1000 * 60 * 60)
      );

      return timeDifferenceInHours <= 23;
    }
    return true;
  });

  return updatedTodos;
}

function TodosData({ todos, setTodos, setTodo, setTodoId }) {
  //console.log("deleted", deleteExpiredItems(todos));
  const { currentUser } = useAuth();
  const { newTodos, completedTodos, deletedTodos } = onSplitArray(todos);
  //console.log(completedTodos);
  const handleCompleted = async (id, stageupdate) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          stage: stageupdate,
          datetime: new Date(),
        };
      }
      return todo;
    });
    //console.log(updatedTodos);
    setTodos(updatedTodos);

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { todos: updatedTodos }, { merge: true });
  };
  useEffect(() => {
    const updatedTodos = deleteExpiredItems(todos);
    const deleteExpiredItemsAndUpdateDatabase = async () => {
      setTodos(updatedTodos);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, { todos: updatedTodos }, { merge: true });
    };

    const isEqual = JSON.stringify(todos) === JSON.stringify(updatedTodos);

    if (!isEqual) {
      console.log("hello");
      deleteExpiredItemsAndUpdateDatabase();
    }
  }, []);

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
      {deletedTodos.length > 0 && <Deleted todos={deletedTodos} />}
    </div>
  );
}

export default TodosData;
