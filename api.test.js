const jest = require("jest");
const { describe, it, test } = require("jest-circus");
const supertest = require("supertest");
const api = require("./api");


let myAPITest = supertest(api);

test("GET /ping", async () =>{
    await myAPITest.get("/ping")
    .expect(200)
    .then((response) =>{
        expect(response.body.success).toBe(true);
    })
});

describe("Testing endpoints", () =>{
    it('GET /posts should show all posts', async () =>{
        let searchQuery = request.query.tag;
        const myResponse = await myAPITest.get(`/posts?tag=${searchQuery}`);
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('posts');
    });

    it('GET /posts should show all posts', async () =>{
        let searchQuery = request.query.tag;
        let sortBy = request.query.sortBy;
        const myResponse = await myAPITest.get(`/posts?tag=${searchQuery}&sortBy=${sortBy}`);
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('posts');
    });

    it('GET /posts should show all posts', async () =>{
        let searchQuery = request.query.tag;
        let sortBy = request.query.sortBy;
        let direction = request.query.direction;
        const response = await myAPITest.get(`/posts?tag=${searchQuery}&sortBy=${sortBy}&direction=${direction}`);
        expect(response.status).toEqual(200);
        expect(response.type).toEqual(expect.stringContaining('json'));
        expect(response.body).toHaveProperty('posts');
    });

});


