import { useFormik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import * as yup from 'yup'
import DiscordInput from './DiscordInput'

interface Props {
  onRegister: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>
}

const RegisterForm = ({ onRegister }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Not a well formed email address')
        .required('This field is required'),
      username: yup.string().required('This field is required'),
      password: yup
        .string()
        .min(8, 'Must be at least 8 characters long')
        .required('This field is required'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        await onRegister(values.email, values.password, values.username)
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          formik.errors.email = 'Email is already registered'
        }
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <form
      className="bg-discord-gray-300 p-8 rounded w-[30em] shadow-lg"
      onSubmit={formik.handleSubmit}
    >
      <div className="mb-5">
        <h1 className="text-white text-2xl font-semibold text-center mb-2">
          Create an account
        </h1>
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
          type="username"
          name="username"
          label="Username"
          autoComplete="username"
          value={formik.values.username}
          error={formik.errors.username}
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
      <button
        className="w-full mb-2 bg-discord-blue-200 p-[0.625em] text-white rounded transition-colors hover:bg-discord-blue-250 disabled:bg-discord-gray-60"
        type="submit"
        disabled={isSubmitting}
      >
        Register
      </button>
      <Link href="/login">
        <a className="text-sm text-discord-blue-100">
          Already have an account?
        </a>
      </Link>
    </form>
  )
}

export default RegisterForm