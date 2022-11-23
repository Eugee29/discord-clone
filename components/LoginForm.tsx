import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import { useState } from 'react'
import DiscordInput from './DiscordInput'
import FormButton from './FormButton'

interface Props {
  onLogin: (username: string, password: string) => Promise<void>
  onGuestLogin: () => Promise<void>
}

const LoginForm = ({ onLogin, onGuestLogin }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialErrors: {},
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Not a well formed email address')
        .required('This field is required'),
      password: yup.string().required('This field is required'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        await onLogin(values.email, values.password)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        let errorMessage
        if (
          error === 'auth/wrong-password' ||
          error === 'auth/user-not-found'
        ) {
          errorMessage = 'Invalid email or password'
        } else if (error === 'auth/too-many-requests') {
          errorMessage = 'Too many requests, slow down'
        } else {
          errorMessage = 'An Unknown error has occurred'
        }

        formik.errors.email = errorMessage
        formik.errors.password = errorMessage
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleGuestLogin = async () => {
    setIsSubmitting(true)
    try {
      await onGuestLogin()
    } catch (err) {
      const errorMessage = 'An Unknown error has occurred'
      formik.errors.email = errorMessage
      formik.errors.password = errorMessage
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="credential-form" onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <h1 className="text-white text-2xl font-semibold text-center mb-2 font-ginto">
          Welcome back!
        </h1>
        <h2 className="text-discord-gray-20 text-center">
          {"I'm so excited to see you again!"}
        </h2>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <DiscordInput
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={formik.handleChange}
        />
        <DiscordInput
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
          value={formik.values.password}
          error={formik.errors.password}
          onChange={formik.handleChange}
        />
      </div>
      <FormButton isLoading={isSubmitting}>Log In</FormButton>
      <h3 className="text-sm text-discord-gray-30">
        Need an account?{' '}
        <Link href="/register">
          <a className="text-discord-blue-100">Register</a>
        </Link>
      </h3>

      <button type="button" onClick={handleGuestLogin} disabled={isSubmitting}>
        <a className="text-discord-blue-100">Or continue as guest</a>
      </button>
    </form>
  )
}

export default LoginForm
