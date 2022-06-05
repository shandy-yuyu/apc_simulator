// Ref: https://stackoverflow.com/questions/64051580/how-to-test-express-router-catch-branch-in-this-scenario-using-jest
const db = require('../../../utilities/db')
beforeAll(async () => {
    db.connect();
    await new Promise(r => setTimeout(r, 3000));
});
  
describe('test', ()=>{
    afterEach(()=>{
        jest.resetModules();
        jest.restoreAllMocks();
    })
    it('test db null', ()=>{
        db.getCollection = jest.fn().mockReturnValue(null);
        const express = require('express');
        const mRouter = {post: jest.fn()};
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mRouter);
        const mReq = {body: jest.fn().mockReturnThis({
            id:0,
            type:'SHARON',
            thickness:0.1,
            moisture:0.2
        })};
        const mSend = jest.fn().mockReturnThis(200);
        const mRes = { 
            status: jest.fn().mockReturnValue({send:mSend }),
            render: jest.fn(tFactor=0.1, mFactor=0.2, metaData=null) 
        };
        let tmp = 0;
        mRouter.post.mockImplementation((path, callback) => {
            if (path === '/api/v1/process') {
              tmp = callback(mReq, mRes);
            }
        });
        require('../../routers/v1/process');
        expect(tmp.Promise).toBeUndefined();
    })
    it('Call by 200', ()=>{
        // global.cache = {
        //     set: jest.fn().mockReturnValueOnce(true),
        //     get: jest.fn().mockReturnThis(0.5)
        // }
        db.getCollection = jest.fn().mockReturnValue({set: true, get: 0.5});
        // db.getCollection = {
        //     set: jest.fn().mockReturnValue(true),
        //     get: jest.fn().mockReturnThis(0.5)
        // }
        const express = require('express');
        const mRouter = {post: jest.fn()};
        jest.spyOn(express, 'Router').mockImplementationOnce(() => mRouter);
        const mReq = {body: jest.fn().mockReturnThis({
            id:0,
            type:'SHARON',
            thickness:0.1,
            moisture:0.2
        })};
        const mSend = jest.fn().mockReturnThis(true);
        // Problem might happened here, but have no idea
        const mRes = { 
            status: jest.fn().mockReturnValue({send:mSend }),
            render: jest.fn(tFactor=0.1, mFactor=0.2, metaData=null) 
        };
        mRouter.post.mockImplementation((path, callback) => {
            if (path === '/api/v1/process') {
              callback(mReq, mRes);
            }
        });
        require('../../routers/v1/process');
        // i dont know why 500 not 200 XD
        expect(mRes.status).toBeCalledWith(200);
    })
})

afterAll(done => {
    db.disconnect();
    done();
});