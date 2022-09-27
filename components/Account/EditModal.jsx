import fetcher from '@/utils/fetcher'
import { Modal, Spacer, Text } from '@nextui-org/react'
import { useEffect } from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import Input from '@/UI/Next/Input'
import NextButton from '@/UI/Next/Button'
import Axios from '@/utils/functions/Axios'
import { toast } from 'react-toastify'

const EditModal = ({ open, setOpen, linkId, mutate }) => {
	const { data } = useSWR(linkId ? `/api/links/${linkId}` : undefined, fetcher)

	const [notes, setNotes] = useState('')
	const [password, setPassword] = useState('')

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setNotes(data?.link.notes || '')
		setPassword(data?.link.password || '')
	}, [data])

	const handleSubmit = async () => {
		setLoading(true)
		const { success, data, error } = await Axios(`/api/links/${linkId}`, { notes, password }, 'PUT')

		console.log(success, data, error)

		if (success) {
			await mutate()
			setLoading(false)
			setOpen({ open: false, linkId: null })
			return toast.success('השינויים נשמרו בהצלחה!', {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		} else {
			setLoading(false)
			return toast.error('חלה שגיאה! ' + error, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		}
	}

	return (
		<Modal
			closeButton
			aria-labelledby='Edit Modal'
			open={open}
			width={450}
			onClose={() => setOpen({ open: false, linkId: null })}
		>
			<Modal.Header>
				<div className='flex flex-col'>
					<Text
						id='modal-title'
						size={22}
					>
						עריכת קישור
					</Text>
				</div>
			</Modal.Header>
			<Modal.Body>
				{linkId && data && (
					<>
						<Spacer y={0.5} />
						<Input
							underlined
							labelPlaceholder='הערות'
							autoComplete='off'
							onChange={(e) => setNotes(e.target.value)}
							disabled={loading}
							value={notes}
							clearable={false}
							style={{ direction: 'rtl' }}
						/>
						<Spacer y={0.5} />
						<Input
							underlined
							labelPlaceholder='סיסמה'
							autoComplete='off'
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
							value={password}
							clearable={false}
							style={{ direction: 'rtl' }}
						/>
						<Spacer y={0.5} />

						<div className='flex flex-row justify-between'>
							<NextButton
								color='error'
								loading={loading}
								onClick={() => setOpen({ open: false, linkId: null })}
								className='w-full'
							>
								ביטול
							</NextButton>
							<NextButton
								color='success'
								loading={loading}
								onClick={handleSubmit}
							>
								שמור שינויים
							</NextButton>
						</div>
					</>
				)}
			</Modal.Body>
		</Modal>
	)
}

export default EditModal
