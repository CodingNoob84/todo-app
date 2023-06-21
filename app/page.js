"use client";
import Header from "@/components/Header";
import ToAddBar from "@/components/ToAddBar";
import TodosData from "@/components/TodosData";
import { useAuth } from "@/context/AuthContext";
import useFetchTodos from "@/hooks/fetchTodos";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { login, signup, currentUser } = useAuth();
  //console.log(currentUser);
  const [todo, setTodo] = useState("");
  //const [todoList, setTodoList] = useState({});
  const { todos, setTodos, loading, error } = useFetchTodos();

  return (
    <main className="flex min-w-screen min-h-screen flex-col bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
      <Header currentUser={currentUser} />
      <ToAddBar
        todo={todo}
        setTodo={setTodo}
        todos={todos}
        setTodos={setTodos}
      />
      <TodosData todos={todos} setTodos={setTodos} />
    </main>
  );
}
