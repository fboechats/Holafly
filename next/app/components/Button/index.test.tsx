import { render } from '@testing-library/react';
import { Button, ButtonProps } from "./index";


describe('Button', () => {
    it.each<[ButtonProps['color'], string]>([
        ['indigo', 'bg-indigo-600'],
        ['green', 'bg-green-600'],
        ['white', 'bg-white'],
        ['red', 'bg-red-600']
    ])('should render with color %s', (color, expectedClass) => {
        const { container } = render(<Button loading={false} color={color}>Click me</Button>);
        expect(container.querySelector('button')).toHaveClass(expectedClass);
    }
    );

    it('should render with only children and loading props', () => {
        const { getByText } = render(<Button loading={true}>Loading...</Button>);

        expect(getByText('Loading...')).toBeInTheDocument();

        expect(getByText('Loading...').parentNode).toHaveAttribute('aria-disabled', 'true');
    });
});
