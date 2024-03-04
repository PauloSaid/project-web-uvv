import fastify from 'fastify';
import createError from '@fastify/error';
import autoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const CustomError = createError('CustomError', 'Error mesage: ', 501);


export async function build(opts){
    const app = fastify(opts);

    app.register(autoload, {
        dir: join(_dirname, 'routes')
    });

    const logMe = async (req, reply) => {
        req.log.info(`Request on route: ${req.url}`);
    }

    app.addHook('onRoute', async (routeOptions) => {
        if(routeOptions.config?.logMe){
            if(!Array.isArray(routeOptions.onRequest) && routeOptions.onRequest)
            {
                routeOptions.onRequest = [routeOptions.onRequest];
            } else{
                routeOptions.onRequest = [];
            }
            routeOptions.onRequest.push(logMe);
        }
    })

    app.get('/error', async (request, reply) => {
        throw CustomError();
    });

    app.setErrorHandler(async (error, req, reply) => {
        const { validation } = error;
        req.log.error({error});
        reply.code(error.statusCode || 500);

        return validation ? `Validation Error: ${validation[0].message}.` : `Internal Server Error`;
    });

    return app;
}