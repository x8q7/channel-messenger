import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import app from '../index';
describe('message api test', () => {
    test('add message', async () => {
        // 发送 GET 请求到应用的 /test 接口
        let response = await supertest(app).post('/message/add').send({ channelId: 1, title: 'game', content: 'game content' }).set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toEqual('ok');
    });

    test('get channel message list', async () => {
        // 发送 GET 请求到应用的 /test 接口
        let response = await supertest(app).get('/message/1?pageNum=0&pageSize=10').set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.code).toBe(0);
        expect(response.body.message).toEqual('ok');
        expect(response.body.data.length).toBeGreaterThan(0);
    });
});