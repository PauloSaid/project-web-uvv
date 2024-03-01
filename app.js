import fastify from 'fastify';
import createError from '@fastify/error';
import fastifyStatic from '@fastify/static';
import spa from './routes/spa.js'
import products from './routes/products.js';


const CustomError = createError('CustomError', 'Error mesage: ', 501);


export async function build(opts){
    const app = fastify(opts);

    app.register(fastifyStatic, {
        root: `${import.meta.dirname}/public`,
        wildcard: false
    });

    app.register(spa);
    app.register(products)

    app.get('/error', async (request, reply) => {
        throw CustomError();
    });

    app.setErrorHandler(async (error, req, reply) => {
        const { validation } = error;
        req.log.error({error});
        reply.code(error.statusCode || 500);

        return validation ? `Validation Error: ${validation[0].message}.` : `Internal Server Error`;
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