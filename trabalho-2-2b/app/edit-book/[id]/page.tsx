"use client";

// pages/edit-book/[id].tsx

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import { parseCookies } from "nookies";

type Book = {
  _id: string;
  name: string;
  qtd: number;
  price: number;
  cat_id: string;
};

export default function EditBook({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!params.id) return;

      const cookies = parseCookies();
      const token = cookies["auth.token"];

      if (!token) {
        router.push("/login");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8080/books/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }
        const bookData = await response.json();
        setBook(bookData);
      } catch (error: any) {
        console.error("Error fetching book:", error);
        setError("An error occurred");
      }

      setLoading(false);
    };

    fetchBook();
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => (prevBook ? { ...prevBook, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book) return;

    const cookies = parseCookies();
    const token = cookies["auth.token"];

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/books/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      router.push("/books");
    } catch (error) {
      setError("An error occurred");
    }

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!book) {
    return <p>No book found</p>;
  }

  return (
    <main className="min-h-screen pt-16 bg-gray-100">
      <Navbar />
      <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
        Edit Book
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={book.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={book.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="qtd" className="block text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="qtd"
            name="qtd"
            value={book.qtd}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </main>
  );
}
