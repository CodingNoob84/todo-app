"use client";
import Header from "@/components/Header";
import ToAddBar from "@/components/ToAddBar";
import TodosData from "@/components/TodosData";
import { useAuth } from "@/context/AuthContext";
import useFetchTodos from "@/hooks/fetchTodos";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const isObjectEmpty = (obj) => {
  if (obj === null) {
    return {};
  }
  return Object.keys(obj).length === 0;
};

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { todos, setTodos, loading, error } = useFetchTodos();
  const [todo, setTodo] = useState("");
  const [todoId, setTodoId] = useState("");
  console.log(todos);
  //console.log(currentUser);
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <main className="flex min-w-screen min-h-screen flex-col bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
      <Header currentUser={currentUser} />
      <div className="flex-1">
        <ToAddBar
          todo={todo}
          setTodo={setTodo}
          todos={todos}
          setTodos={setTodos}
          todoId={todoId}
          setTodoId={setTodoId}
        />
        {!loading && todos && (
          <TodosData
            todos={todos}
            setTodos={setTodos}
            setTodo={setTodo}
            setTodoId={setTodoId}
          />
        )}
      </div>
      <Footer />
    </main>
  );
}
