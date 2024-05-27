import { AuthStore } from "../store";

export type LoginProps = {
  email: string,
  password: string,
}

export type LoginResult = {
  token: AuthStore['token'],
  user: AuthStore['user'],
}

export async function login({ email, password }: LoginProps) {
  try {
    const result = await fetch(
      'http://localhost:8000/auth/login',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

    return result.json() as Promise<LoginResult>;
  } catch (error) {
    throw Error("Invalid credentials")
  }
}

export type Plans = Array<{
  status: "expired" | "active" | "pending",
  dateStart: string,
  dateEnd: string,
  flag: string,
  country: string,
  plan: string,
  comsuption: {
    totalComsumption: number,
  },
}>

export async function getPlans(token: string) {
  try {
    const result = await fetch(
      'http://localhost:8000/plans',
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

    return result.json() as Promise<Plans>;
  } catch (error) {
    throw Error("Try again later")
  }
}