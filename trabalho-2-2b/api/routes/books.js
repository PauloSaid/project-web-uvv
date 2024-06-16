import createError from '@fastify/error';

export default async function books(app, options) {
    const InvalidBookError = createError('InvalidBookError', 'Produto Inválido.', 400);
    const books = app.mongo.db.collection('books');
    const categories = app.mongo.db.collection('categories'); // Assuming you have a categories collection

    app.get('/books', async (request, reply) => {
        return await books.find().toArray();
    });

    app.post('/books', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    qtd: { type: 'integer' },
                    price: { type: 'integer' },
                    cat_id: { type: 'string' }
                },
                required: ['name', 'qtd', 'price', 'cat_id']
            }
        }
    }, async (request, reply) => {
        const book = request.body;

        // Check if the category exists
        let category = await categories.findOne({ name: book.cat_id });

        // If category doesn't exist, create it
        if (!category) {
            const result = await categories.insertOne({ name: book.cat_id });
            if (!result.insertedId) {
                throw new Error('Failed to create category');
            }
            category = { _id: result.insertedId, name: book.cat_id };
        }

        // Now set the category ID in the book object
        book.cat_id = category._id.toString(); // Convert ObjectId to string

        // Insert the book into the books collection
        const result = await books.insertOne(book);
        if (!result.insertedId) {
            throw new InvalidBookError();
        }
        return reply.code(201).send(book);
    });

    // Other endpoints remain unchanged
    // Handle GET, DELETE, PUT for individual books
}
