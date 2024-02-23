import fastify from 'fastify';

export async function build(options)
{
    const app = fastify(options);

    app.get('/', async (req, reply) => {
        return{hello: 'world'}
    });    

    return app;
}