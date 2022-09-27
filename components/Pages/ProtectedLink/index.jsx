import NextButton from '@/components/UI/Next/Button'
import Input from '@/components/UI/Next/Input'
import Axios from '@/utils/functions/Axios'
import { Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ProtectedLink = ({ id }) => {
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async () => {
		setLoading(true)
		const { success, data, error } = await Axios('/api/links/protected', { id, password }, 'POST')
		console.log(success, data, error)
		if (!success) {
			toast.error(error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
			return setLoading(false)
		}
		router.push(data.url)
	}

	return (
		<div className='bg-neutral-200 rounded-lg py-20 px-32 w-fit flex flex-col items-center my-32 mt-44 mx-auto'>
			<h4>הקישור מוגן בעזרת סיסמה</h4>
			<Spacer y={0.3} />
			<Input
				type='password'
				placeholder='הקלד סיסמה'
				state={password}
				onChange={(e) => setPassword(e.target.value)}
				loading={loading}
				bordered
				autoComplete='off'
			/>
			<Spacer y={1} />
			<NextButton
				loading={loading}
				onClick={handleSubmit}
			>
				אישור
			</NextButton>
		</div>
	)
}

export default ProtectedLink
