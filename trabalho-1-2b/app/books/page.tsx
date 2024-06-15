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
  cat_id: string;
}

interface Category {
  _id: string;
  name: string;
}


  const Books = () => { 

    
    const [books, setBooks] = useState<Book[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await request<Book[]>('http://localhost:8080/books');
          setBooks(data);
          const response = await fetch('http://127.0.0.1:8080/categories');
          const categoriesData = await response.json();
          setCategoryList(categoriesData);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
        setLoading(false);
      };
  
      fetchData();
    }, []);

    const filterBooks = (category:string)=>{
      setSelectedCategory(category);
    };

    const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(Book => Book.cat_id === selectedCategory);

    return (
      <main className="min-h-screen pt-16 bg-gray-100">
        <Navbar />
        <h1 className="text-2xl sm:text-4xl font-black tracking-wide text-center pt-6 pb-10 sm:pb-24">
          Books:
        </h1>
  
        <div id="filters" className="flex flex-col items-center mb-4">
          <button
            onClick={() => filterBooks('all')}
            className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">
            Todos
          </button>
          {categoryList.map(category => (
            <button
              key={category._id}
              onClick={() => filterBooks(category._id)}
              className="bg-blue-500 text-white py-2 px-4 m-2 rounded hover:bg-blue-700">
              {category.name}
            </button>
          ))}
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredBooks.map(book => (
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