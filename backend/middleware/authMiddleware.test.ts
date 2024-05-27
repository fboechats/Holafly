import jwt from 'jsonwebtoken';
import { verifyToken } from './authMiddleware';

describe('verifyToken middleware', () => {
    it('calls next() if token is valid', () => {
        const mockRequest = {
            header: jest.fn().mockReturnValue('Bearer valid-token')
        } as any

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any

        const mockNext = jest.fn();

        jwt.verify = jest.fn().mockReturnValue({ userId: 123 })

        verifyToken(mockRequest, mockResponse, mockNext)

        expect(mockNext).toHaveBeenCalled()
    });

    it('returns 401 if no token provided', () => {
        const mockRequest = {
            header: jest.fn().mockReturnValue(undefined)
        } as any;

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        const mockNext = jest.fn();

        verifyToken(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access denied' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('returns 401 if token is invalid', () => {
        const mockRequest = {
            header: jest.fn().mockReturnValue('Bearer invalid-token')
        } as any;

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        const mockNext = jest.fn();

        jwt.verify = jest.fn().mockImplementation(() => { throw new Error('Invalid token'); });

        verifyToken(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid token' });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('returns 401 if token is expired', () => {
        const mockRequest = {
            header: jest.fn().mockReturnValue('Bearer expired-token')
        } as any;

        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as any;

        const mockNext = jest.fn();

        jwt.verify = jest.fn().mockImplementation(() => { throw new jwt.TokenExpiredError('Expired token', new Date()); });

        verifyToken(mockRequest, mockResponse, mockNext);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid token' });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
