import fastify from 'fastify';
import createError from '@fastify/error';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const CustomError = createError('CustomError', 'Error mesage: ', 501);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function build(opts){
    const app = fastify(opts);

    app.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
        wildcard: false
    });

    app.get('/error', async (request, reply) => {
        throw CustomError();
    });

    app.get('/*', async (request, reply) => {
        return reply.sendFile('index.html');
    });

    const products = [
        {id: 1, name: 'Tomate', qtd: 20},
        {id: 2, name: 'Cebola', qtd: 50}
    ]

    app.get('/products', async (request, reply) => {
        return products;
    });

    app.post('/products', async (request, reply) => {
        let product = request.body;
        return {product};
    });

    app.get('/products/:id', async (request, reply) => {
        app.log.info('Produto requisitado> ' + request.params.id);
        return {};
    });
    
    app.delete('/products/:id', async (request, reply) => {
        app.log.info('Produto para remover> ' + request.params.id);
        return {};
    });

    app.setErrorHandler(async (error, req, reply) => {
        req.log.error({error});
        reply.code(error.statusCode || 500);

        return 'Internal Server Error.'
    });

    app.get('/notfound', async (req, reply) => {
        reply.log.info('Sending to not found handler.');
        app.callNotFound();
    })

    app.setNotFoundHandler(async (req, reply) => {
        reply.code(404);
        return 'Route could not be found';
    });

    return app;
}