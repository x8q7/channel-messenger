import { describe, expect, test } from '@jest/globals';
import supertest from "supertest";
import app from "../index";
describe('channel api test', () => {
    test('create channel', async () => {
        // 发送 GET 请求到应用的 /test 接口
        let response = await supertest(app).post('/channel/create').send({ channelName: 'dota2' }).set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toEqual("ok");
    })

    test('get channel list', async () => {
        // 发送 GET 请求到应用的 /test 接口
        let response = await supertest(app).get('/channel/list').set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toEqual("ok");
        expect(response.body.data.length).toBeGreaterThan(0);
    })

    test('get channel by id', async () => {
        // 发送 GET 请求到应用的 /test 接口
        let response = await supertest(app).get('/channel/1').set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toEqual("ok");
        expect(response.body.data.id).toBe(1);
        expect(response.body.data.name).toEqual("dota2");
    })
})