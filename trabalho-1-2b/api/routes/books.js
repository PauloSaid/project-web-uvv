/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function books(app, options) {
    const InvalidBookError = createError('InvalidBookError', 'Produto Inválido.', 400);

    const books = app.mongo.db.collection('books');

    app.get('/books', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await books.find().toArray();
        }
    );

    app.post('/books', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' },
                    price: { type: 'integer'}
                },
                required: ['name', 'qtd', 'price']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let book = request.body;
        
        await books.insertOne(book);

        return reply.code(201).send();
    });

    app.get('/books/:id', async (request, reply) => {
        let id =  request.params.id;
        let book = await books.findOne({_id: new app.mongo.ObjectId(id)});
        
        return book;
    });
    
    app.delete('/books/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await books.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();;
    });

    app.put('/books/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let book = request.body;
        
        await books.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: book.name,
                qtd: book.qtd,
                price: book.price
            }
        });
        
        return reply.code(204).send();;
    });

    app.get('/categories/:id/books', async (req, rep) => {
        let id = req.params.id;
        let booksArray = await books.find({cat_id: id}).toArray();

        return booksArray;
    });
}