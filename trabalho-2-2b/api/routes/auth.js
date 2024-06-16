/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function auth(app, options) {
    const users = app.mongo.db.collection('users');

    app.post('/auth', async (request, reply) => {
        const user = request.body;
        request.log.info(`Login for user ${user.username}`);
        
        const existingUser = await users.findOne({ username: user.username, password: user.password });
        if (!existingUser) {
            return reply.code(401).send({ error: 'Invalid username or password' });
        }

        delete existingUser.password;
        return {
            'x-access-token': app.jwt.sign(existingUser)
        }
    });
    
    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['username', 'password']
            }
        },
        config: {
            requireAuthentication: false
        }
    }, async (request, reply) => {
        const user = request.body;
        
        const existingUser = await users.findOne({ username: user.username });
        if (existingUser) {
            return reply.code(400).send({ error: 'Username already exists' });
        }

        await users.insertOne(user);
        return reply.code(201).send();
    });
}
