/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
import books from './books.js';
export default async function categories(app, options) {
    const InvalidCategoryError = createError('InvalidCategoryError', 'Categoria Inválida.', 400);

    const categories = app.mongo.db.collection('categories');
    const book = app.mongo.db.collection('books');

    app.get('/categories', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await categories.find().toArray();
        }
    );

    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                },
                required: ['name']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let category = request.body;
        
        await categories.insertOne(category);

        return reply.code(201).send();
    });

    app.get('/categories/:id', async (request, reply) => {
        let id =  request.params.id;
        let category = await categories.findOne({_id: new app.mongo.ObjectId(id)});
        
        return category;
    });

    app.get('/categories/:id/books', async (req, rep) => {
        let id = req.params.id;
        let books = await book.find({cat_id: id}).toArray();
        
        return books;
    });
    
    app.delete('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        
        await categories.deleteOne({_id: new app.mongo.ObjectId(id)});
        
        return reply.code(204).send();;
    });

    app.put('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let category = request.body;
        
        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: category.name,
            }
        });
        
        return reply.code(204).send();;
    });
}