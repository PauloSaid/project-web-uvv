"use client";

import Navbar from '@/components/NavBar';
import { request } from '@/services/request';
import { useEffect, useState } from 'react';
 
type ResponseData = {
  message: string
}

type Book = {
  id: number;
  name: string;
  qtd: number;
  price: number;
}

  const Books = ({}) => { 

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await request<Book[]>('http://localhost:8080/books');
          setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
        setLoading(false);
      };
  
      fetchData();
    }, []);

  return (
    <main className="min-h-screen pt-16 bg-gray-100">
  <Navbar />
  <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
    Books: 
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
    {loading ? (
      <p>Loading...</p>
    ) : (
      books.map(book => (
        <div key={book.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold">{book.name}</h2>
            <p className="text-gray-600">Price: ${book.price}</p>
            <p className="text-gray-600">Stock: {book.qtd}</p>
          </div>
        </div>
      ))
    )}
  </div>
</main>
  );
};

export default Books;