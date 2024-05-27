import { fireEvent, render, waitFor } from '@testing-library/react';
import { getPlans } from '../services';
import { useAuthStore } from '../store';
import Page from './page';

jest.mock('../services');
jest.mock('../store');

describe('Page component', () => {
    it('renders cards for all plans by default', async () => {
        const plans = [
            {
                id: 1,
                status: 'active',
                country: 'USA',
                dateStart: '2023-01-01',
                dateEnd: '2023-12-31',
                plan: 'Premium'
            },
            {
                id: 2,
                status: 'pending',
                country: 'Canada',
                dateStart: '2023-02-01',
                dateEnd: '2023-12-31',
                plan: 'Basic'
            },
            {
                id: 3,
                status: 'expired',
                country: 'UK',
                dateStart: '2023-03-01',
                dateEnd: '2023-12-31',
                plan: 'Pro'
            },
        ];

        jest.mocked(useAuthStore).mockReturnValue({ token: 'mocked-token' });

        (getPlans as jest.Mock).mockResolvedValue(plans);

        const { getByText } = render(<Page />);

        await waitFor(() => {
            expect(getByText('USA')).toBeInTheDocument();
            expect(getByText('Canada')).toBeInTheDocument();
            expect(getByText('UK')).toBeInTheDocument();
        });
    });

    it('renders cards for active plans when "Active" tab is clicked', async () => {
        // Mocked plans
        const plans = [
            {
                id: 1,
                status: 'active',
                country: 'USA',
                dateStart: '2023-01-01',
                dateEnd: '2023-12-31',
                plan: 'Premium'
            },
            {
                id: 2,
                status: 'pending',
                country: 'Canada',
                dateStart: '2023-02-01',
                dateEnd: '2023-12-31',
                plan: 'Basic'
            },
            {
                id: 3,
                status: 'expired',
                country: 'UK',
                dateStart: '2023-03-01',
                dateEnd: '2023-12-31',
                plan: 'Pro'
            },
        ];

        jest.mocked(useAuthStore).mockReturnValue({ token: 'mocked-token' });

        (getPlans as jest.Mock).mockResolvedValue(plans);

        const { getByText, queryByText, getByRole } = render(<Page />);

        await waitFor(() => {
            expect(getByText('USA')).toBeInTheDocument();
        });

        fireEvent.click(getByRole('button', { name: "Active" }));

        expect(queryByText('Canada')).not.toBeInTheDocument();
        expect(queryByText('UK')).not.toBeInTheDocument();
    });
});
