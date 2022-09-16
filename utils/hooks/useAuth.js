import { useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'
//import Button from '@/next/Button'

import cookie from 'js-cookie'
import { toast } from 'react-toastify'
import AuthModal from '@/components/Auth/AuthModal'

const useUser = () => {
	const router = useRouter()

	const { data, mutate, error } = useSWR('/api/auth/auth', fetcher)

	const handleLogout = async () => {
		cookie.remove('token')
		// ? router.push('/')
		mutate()
		return toast.warning('התנתקת בהצלחה!', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	return {
		loggedIn: data?.userId ? true : false,
		user: data,
		mutate,

		handleLogout,

		AuthModal,
	}
}

export default useUser
