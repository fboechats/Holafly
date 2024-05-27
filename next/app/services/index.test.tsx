import { getPlans, login } from './index';

describe('API functions', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('login', () => {
        it('returns token and user on successful login', async () => {
            const mockLoginResponse = {
                token: 'mocked-token',
                user: { id: 1, email: 'user@example.com', name: 'John Doe' }
            };

            jest.mocked(global.fetch).mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockLoginResponse)
            } as any);

            const loginResult = await login({ email: 'user@example.com', password: 'password' });

            expect(loginResult.token).toEqual('mocked-token');
            expect(loginResult.user).toEqual(mockLoginResponse.user);
        });

        it('throws error on invalid credentials', async () => {
            jest.mocked(global.fetch).mockRejectedValueOnce(new Error('Invalid credentials'));

            await expect(login({ email: 'invalid@example.com', password: 'password' })).rejects.toThrow('Invalid credentials');
        });
    });

    describe('getPlans', () => {
        it('returns plans with valid token', async () => {
            const mockPlansResponse = [
                {
                    status: 'active',
                    dateStart: '2023-01-01',
                    dateEnd: '2023-12-31',
                    country: 'USA',
                    plan: 'Premium',
                    consumption: {
                        totalConsumption: 100
                    }
                },
                {
                    status: 'pending',
                    dateStart: '2023-02-01',
                    dateEnd: '2023-12-31',
                    country: 'Canada',
                    plan: 'Basic',
                    consumption: {
                        totalConsumption: 200
                    }
                }
            ];

            jest.mocked(global.fetch).mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockPlansResponse)
            } as any);

            const plans = await getPlans('mocked-token');

            expect(plans).toEqual(mockPlansResponse);
        });

        it('throws error on invalid token', async () => {
            jest.mocked(global.fetch).mockRejectedValueOnce(new Error('Unauthorized'));

            await expect(getPlans('invalid-token')).rejects.toThrow('Try again later');
        });
    });
});
