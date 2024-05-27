import { render } from '@testing-library/react';
import { Card, CardProps } from './index';

describe('Card component', () => {
    it.each<[CardProps['status'], string]>([
        ['expired', 'Expired'],
        ['active', 'Active'],
        ['pending', 'Pending']
    ])('renders correctly with status %s', (status, expectedStatusText) => {
        const { getByText } = render(
            <Card
                status={status}
                country="USA"
                dateStart="2023-01-01"
                dateEnd="2023-12-31"
                plan="Premium"
                flag=""
                comsuption={{
                    totalComsumption: 3821093
                }}
            />
        );

        expect(getByText(expectedStatusText)).toBeInTheDocument();
    });
});