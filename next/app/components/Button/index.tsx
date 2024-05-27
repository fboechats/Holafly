import { ReactNode } from 'react'

export type ButtonProps = {
  children: ReactNode
  loading: boolean
  color?: "green" | "indigo" | "red" | "white",
}

export const Button = ({ children, loading, color = "indigo" }: ButtonProps) => {
  const colors = {
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-700 text-black",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-700 text-white",
    indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-700 text-white",
    white: "bg-white hover:bg-gray-100 focus:ring-gray-100 text-black",
  }

  return (
    <button
      type={loading ? 'button' : 'submit'}
      aria-disabled={loading}
      className={`flex flex-1 justify-center items-center w-[100%] rounded-md border px-8 py-3 text-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors[color]}`}
    >
      <div className='flex-1'>
        {children}
      </div>
      {loading && (
        <svg
          className="size-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      <span aria-live="polite" className="sr-only" role="status">
        {loading ? 'Loading' : 'Submit form'}
      </span>
    </button>
  )
}
