import { useFormik } from 'formik';
import * as Yup from 'yup';

type AddBookFormProps = {
  onAdd: (newBook: Book) => void;
};

const AddBookForm: React.FC<AddBookFormProps> = ({ onAdd }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      qtd: '',
      price: '',
      cat_id: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      qtd: Yup.number().required('Required').positive().integer(),
      price: Yup.number().required('Required').positive(),
      cat_id: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
        try {
            const response = await fetch('http://localhost:8080/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add book');
            }
    
            const newBook = await response.json();
            onAdd(newBook);
            resetForm();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="mb-2">
        <label htmlFor="qtd" className="block text-gray-700">Quantity</label>
        <input
          id="qtd"
          name="qtd"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.qtd}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {formik.touched.qtd && formik.errors.qtd ? (
          <div className="text-red-500 text-xs">{formik.errors.qtd}</div>
        ) : null}
      </div>

      <div className="mb-2">
        <label htmlFor="price" className="block text-gray-700">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {formik.touched.price && formik.errors.price ? (
          <div className="text-red-500 text-xs">{formik.errors.price}</div>
        ) : null}
      </div>

      <div className="mb-2">
        <label htmlFor="cat_id" className="block text-gray-700">Category</label>
        <input
          id="cat_id"
          name="cat_id"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cat_id}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
        {formik.touched.cat_id && formik.errors.cat_id ? (
          <div className="text-red-500 text-xs">{formik.errors.cat_id}</div>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
