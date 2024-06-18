
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EditBook = () => {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<any>(null); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }
        const bookData = await response.json();
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit Book</h1>
      <p>ID: {book._id}</p>
      <p>Name: {book.name}</p>
      <p>Price: ${book.price}</p>
      <p>Stock: {book.qtd}</p>
    </div>
  );
};

export default EditBook;
