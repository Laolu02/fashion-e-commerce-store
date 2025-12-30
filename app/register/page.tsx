// app/register/page.tsx
import { registerAction } from '@/app/actions/auth';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        <form action={registerAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}