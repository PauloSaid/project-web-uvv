"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import Navbar from "@/components/NavBar";
import AddBookForm from "@/components/AddBookForm";

type Book = {
  id: number;
  name: string;
  qtd: number;
  price: number;
  cat_id: string;
};

const AddBookPage = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["auth.token"];

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleAddBook = (newBook: Book) => {
    console.log("New book added:", newBook);
  };

  return (
    <main className="min-h-screen pt-16 bg-gray-100">
      <Navbar />
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Add a New Book
      </h1>
      <div className="flex justify-center">
        <AddBookForm onAdd={handleAddBook} />
      </div>
    </main>
  );
};

export default AddBookPage;
