/**@type{import('fastify').FastifyPluginAsync<>}  */

export default async function spa(app, options)
{
    app.get('/*', async (request, reply) => {
        return reply.sendFile('index.html');
    });
}