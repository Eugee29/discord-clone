import Link from 'next/link'

const LoginForm = () => {
  return (
    <form className="bg-discord-gray-300 p-8 rounded w-[30em] shadow-lg">
      <div className="mb-5">
        <h1 className="text-white text-2xl font-semibold text-center">
          Welcome back!
        </h1>
        <h2 className="text-discord-gray-20 text-center">
          We're so excited to see you again!
        </h2>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-transform: uppercase text-discord-gray-20 font-medium text-xs mb-2"
          >
            Email or phone number
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="p-[10px] rounded bg-black bg-opacity-40 text-white h-10"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-transform: uppercase text-discord-gray-20 font-medium text-xs mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="p-[10px] rounded bg-black bg-opacity-40 text-white h-10"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full mb-2 bg-discord-blue-200 p-[0.625em] text-white rounded transition-colors hover:bg-discord-blue-250"
      >
        Login
      </button>
      <h3 className="text-sm text-discord-gray-60">
        Need an account?{' '}
        <Link href="/register">
          <a className="text-discord-blue-100">Register</a>
        </Link>
      </h3>
    </form>
  )
}

export default LoginForm
