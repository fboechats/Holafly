'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./components/Button";
import { Form } from "./components/Form";
import { useAuthStore } from './store';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-black">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true)

            const emailInput = event.currentTarget.elements.namedItem("email") as HTMLInputElement;

            const passwordInput = event.currentTarget.elements.namedItem("password") as HTMLInputElement;

            const result = await login({ email: emailInput.value, password: passwordInput.value });

            if (result.token) {
              return router.push("/plans")
            }

            setLoading(false)
          }}
        >
          <Button loading={loading}>Sign in</Button>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <a href="/login" className="font-semibold text-gray-800">
              Sign Up
            </a>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  );
}
