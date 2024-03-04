/**@type{import('fastify').FastifyPluginAsync<>}  */

import createError from '@fastify/error';
import fastify from 'fastify';

export default async function products(app, options)
{
    const ModelError = createError("Model State Invalid.", "Error mensage: ", 400)

    app.post('/products/create' , {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    qtd: { type: 'integer' }
                },
                required: ['name', 'description' ,'qtd']
            }
        }
    }, async (request, reply) => {
        let product = req.body;
        if(  product.id != null && product.name != null && product.qtd != null && product.description != null)
        {
            return product;
        } else{
            return ModelError;
        }
    });

    app.get('/products/:id?', { config: {logMe: true} } ,async (request, reply) => {
        return {};
    })

    app.delete('/products/delete/:id', async (req, reply) => {
        return {};
    })
}