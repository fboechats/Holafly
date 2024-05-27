import { fireEvent, render } from '@testing-library/react';
import { Form } from './index';

describe('Form component', () => {
    it('renders form with email and password inputs', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <Form onSubmit={() => undefined}>
                Form
            </Form>
        );

        const emailInput = getByLabelText('Email Address') as HTMLInputElement;
        const passwordInput = getByLabelText('Password') as HTMLInputElement;

        expect(emailInput).toBeInTheDocument();
        expect(emailInput.type).toBe('email');
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput.type).toBe('password');

        expect(getByPlaceholderText('user@acme.com')).toBeInTheDocument();
    });

    it('renders form with correct action', () => {
        const { container } = render(
            <Form onSubmit={() => undefined}>
                Form
            </Form>
        );

        const formElement = container.querySelector('form');

        expect(formElement).toHaveAttribute('action', '/submit');
    });

    it('associates labels with input elements correctly', () => {
        const { getByLabelText, getByText, } = render(
            <Form onSubmit={() => undefined}>
                Form
            </Form>
        );

        const emailLabel = getByText('Email Address') as HTMLLabelElement;
        const emailInput = getByLabelText('Email Address');
        const passwordLabel = getByText('Password') as HTMLLabelElement;
        const passwordInput = getByLabelText('Password');

        expect(emailLabel).toBeInTheDocument();
        expect(emailInput.id).toBe(emailLabel.htmlFor);
        expect(passwordLabel).toBeInTheDocument();
        expect(passwordInput.id).toBe(passwordLabel.htmlFor);
    });

    it('should call the onSubmit callback', () => {
        const onSubmitMock = jest.fn();

        const { getByRole } = render(
            <Form onSubmit={onSubmitMock}>
                Form
            </Form>
        );

        const form = getByRole('form');

        fireEvent.submit(form);

        expect(onSubmitMock).toHaveBeenCalled();
    });
});
