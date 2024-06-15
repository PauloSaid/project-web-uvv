import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdWxvIiwicGFzc3dkIjoiYXNkIiwiaWF0IjoxNzEzNTI1MDkxfQ.JcPscrzsBlDEmYb7x-bwbrJ8yEx5Av9xS0Zh3bsBFmY"

const bookTest = "bookTest" + (Math.random() * 100) + (Math.random() * 100)

const CreateCategorieTest = {
    name: 'Category',
}

const CreateUserTest = {
    username: 'abobobobo',
    passwd: '69123'
}

const CreateBookTest = {
    name: bookTest,
    qtd: '100',
    cat_id: '6616ca6fc0c1625999b9ef7f'
}

const UpdateBookTeste = {
    name: "Abu",
    qtd: 100
}

const UpdateCategorieTest = {
    name: 'Testcategorie',
}

describe('###Tests for Server Configuration', async (t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);
        t.after(async () => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://localhost:27017/dositio');
    });
});

describe('###Tests for Routes', async (t) => {

    describe('##Success Requests', async (t) => {
        test('# GET /books', async (t) => {
            const app = await build(options);
            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/books'
            });

            equal(response.statusCode, 200);
        });
        test('# POST /books', async (t) => {
            const app = await build(options);
            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/books',
                body: CreateBookTest,
                headers: { "x-access-token": jwtToken }

            });

            equal(response.statusCode, 201)
        });

        test('# DELETE /books', async(t) => {
            const app = await build(options);

            t.after(async() => {
            await app.close();
            });

            const response = await app.inject({
                method: 'DELETE',
                url: '/books/662255dbcf2b820d8886709f',
                headers: {
                    'x-access-token': jwtToken
                }

            });
            equal(response.statusCode, 204);
        });


        test('# PUT /books/66224f13accb8095f1246264', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: 'books/66224f13accb8095f1246264',
                body: UpdateBookTeste,
                headers: { "x-access-token": jwtToken }
            });

            equal(response.statusCode, 204)
        })
    });

    describe('##Bad Requests', async (t) => {
        test('# no token', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'PUT',
                url: '/books/6616ca5a7c88395ea9a658a9',
                body: UpdateCategorieTest,
                headers: {

                }
            });
            equal(response.statusCode, 401);
        });
        test('# invalid token', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            let originalString = "stringzona";
            let newString = "newstring"

            const response = await app.inject({
                method: 'PUT',
                url: '/categories/660161914e199a258a5a5e59',
                body: UpdateCategorieTest,
                headers: {
                    'x-access-token': newString
                }
            });
            equal(response.statusCode, 401);
        });

        test('# Not found', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'GET',
                url: '/notfound'
            });
            equal(response.statusCode, 404);
        });
    });

});

describe('###Tests for Authenticated routes', async (t) => {
    describe('##Success Request', async (t) => {
        test('# POST /categories', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });

            const response = await app.inject({
                method: 'POST',
                url: '/categories',
                body: CreateCategorieTest,
                headers: {
                    'x-access-token': jwtToken
                }
            });
            equal(response.statusCode, 201);
        });
    });

    test('# POST /categories', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });

        const response = await app.inject({
            method: 'GET',
            url: '/categories',
        });
        equal(response.statusCode, 200);
    });

    test('# POST /register', async(t) => {
        const app = await build(options);

        t.after(async() => {
        await app.close();
        });

        const response = await app.inject({
            method: 'POST',
            url: '/register',
            body: CreateUserTest,
            headers: {
                'x-access-token': jwtToken
            }

        });
        equal(response.statusCode, 201);
    });
});