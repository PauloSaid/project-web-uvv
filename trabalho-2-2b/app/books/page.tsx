"use client";

import Navbar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

type Book = {
  _id: string;
  name: string;
  qtd: number;
  price: number;
  cat_id: string;
};

interface Category {
  _id: string;
  name: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const cookies = parseCookies();
      const token = cookies["auth.token"];

      if (!token) {
        router.push("/login");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const responseBooks = await fetch("http://localhost:8080/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!responseBooks.ok) {
          throw new Error("Failed to fetch books");
        }
        const booksData: Book[] = await responseBooks.json();
        setBooks(booksData);

        // Fetch categories
        const responseCategories = await fetch(
          "http://127.0.0.1:8080/categories"
        );
        if (!responseCategories.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData: Category[] = await responseCategories.json();
        setCategoryList(categoriesData);
      } catch (error) {
        setError("An error occurred");
      }

      setLoading(false);
    };

    fetchData();
  }, [router]);

  const filterBooks = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredBooks =
    selectedCategory === "all"
      ? books
      : books.filter((book) => book.cat_id === selectedCategory);

  const handleEdit = (book: Book) => {
    router.push(`/edit-book/${book._id}`);
  };

  const handleDelete = async (bookId: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar este livro?"
    );
    if (!confirmDelete) return;

    try {
      const cookies = parseCookies();
      const token = cookies["auth.token"];

      const response = await fetch(`http://localhost:8080/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      setError("An error occurred");
    }
  };
  return (
    <main className="min-h-screen pt-16 bg-gray-100">
      <Navbar />
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Books:
      </h1>

      <div
        id="filters"
        className="flex flex-row items-center mb-4 justify-center"
      >
        <Link href="/add-book" passHref>
          <button className="bg-green-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">
            Add Books
          </button>
        </Link>
        <button
          onClick={() => filterBooks("all")}
          className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700"
        >
          Todos
        </button>
        {categoryList.map((category) => (
          <button
            key={category._id}
            onClick={() => filterBooks(category._id)}
            className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700"
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold">{book.name}</h2>
                <p className="text-gray-600">Price: ${book.price}</p>
                <p className="text-gray-600">Stock: {book.qtd}</p>
              </div>
              <div className="flex mt-4">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-green-500 text-white py-2 px-4 mr-2 rounded hover:bg-green-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Books;
