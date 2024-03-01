/**@type{import('fastify').FastifyPluginAsync<>}  */

import createError from '@fastify/error';
import fastify from 'fastify';

export default async function products(app, options)
{
    const ModelError = createError("Model State Invalid.", "Error mensage: ", 400)

    app.get('/products' , {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    qtd: { type: 'integer' }
                },
                required: ['name', 'qtd']
            }
        }
    }, async (request, reply) => {
        return reply.sendFile('products.html');
    });

    app.post('/products/create', async (req, reply) => {
        let product = req.body;
        if(  product.id != null && product.name != null && product.qtd != null)
        {
            return product;
        } else{
            return ModelError;
        }
    })
}