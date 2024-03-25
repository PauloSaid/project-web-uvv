/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function auth(app, options) {
    
    const users = app.mongo.db.collection('users');


    app.post('/auth', (request, reply) => {
        let user = request.body;
        request.log.info(`Login for user ${user.username}`);
        //check login details
        delete user.password;
        return {
            'x-access-token' : app.jwt.sign(user)
        }
    });
    
    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    passwd: { type: 'string' }
                },
                required: ['username', 'passwd']
            }
        },
        config: {
            requireAuthentication: false
        }
    }, async (request, reply) => {
        let user = request.body;
        
        await users.insertOne(user);

        return reply.code(201).send();
    });
}