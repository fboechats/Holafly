import { fireEvent, render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Page from './page';
import { useAuthStore } from './store';

// Mock do useRouter
jest.mock("next/navigation");

// Mock do useAuthStore
jest.mock('./store');

describe('Login Page', () => {
    it('submits login form with correct data', async () => {
        const mockLogin = jest.fn();
        jest.mocked(useAuthStore).mockReturnValue({ login: mockLogin });

        const mockPush = jest.fn();
        jest.mocked(useRouter).mockReturnValue({ push: mockPush } as any);

        const { getByText, getByLabelText } = render(<Page />);

        const emailInput = getByLabelText('Email Address') as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const passwordInput = getByLabelText('Password') as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(getByText('Sign in'));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
        });

        expect(mockPush).toHaveBeenCalledWith('/plans');
    });
});
