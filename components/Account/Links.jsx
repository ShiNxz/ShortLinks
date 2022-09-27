import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Table from '@nextui-org/react/table'
import Loading from '@nextui-org/react/loading'
import Tooltip from '@nextui-org/react/tooltip'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { TiEdit } from 'react-icons/ti'
import { MdOutlineDeleteForever } from 'react-icons/md'
import Axios from '@/utils/functions/Axios'
import { timeSince } from '@/utils/functions/Time'
import { Title } from '../Pages/Home/Header'
import EditModal from './EditModal'

const Links = ({ Key, Value }) => {
	const { data, mutate } = useSWR(`/api/links?key=${Key}&value=${Value}`, fetcher)
	const [links, setLinks] = useState([])
	const [editModal, setEditModal] = useState({ open: false, linkId: null })

	useEffect(() => {
		if (data?.links) setLinks(data.links)
	}, [data])

	const handleCopy = async (url) => {
		await navigator.clipboard.writeText(url)
		return toast.success('הקישור הועתק', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	const handleDelete = async (id) => {
		const { success, data } = await Axios('/api/links', { id }, 'DELETE')
		if (success) {
			mutate()
			return toast.success(data?.message, {
				autoClose: 3000,
				closeButton: true,
				closeOnClick: true,
			})
		}
	}

	return (
		<div className='w-full min-h-[40vh]'>
			<Title>קישורים שנוצרו</Title>
			{data ? (
				<Table
					aria-label='Example table with static content'
					css={{
						height: 'auto',
						minWidth: '100%',
						with: '100%',
					}}
					striped
					fixed
					borderWeight={0}
				>
					<Table.Header className='text-center'>
						<Table.Column className='w-1/6'>קישור מקורי</Table.Column>
						<Table.Column className='w-1/6'>קישור מקוצר</Table.Column>
						<Table.Column className='w-1/6'>מספר כניסות</Table.Column>
						<Table.Column className='w-1/6'>תאריך קיצור</Table.Column>
						<Table.Column className='w-1/6'>הערות</Table.Column>
						<Table.Column className='w-1/6'>סיסמה</Table.Column>
						<Table.Column className='w-1/10'>פעולות</Table.Column>
					</Table.Header>
					<Table.Body>
						{links.map((link) => (
							<Table.Row key={link._id}>
								<Table.Cell>
									<div
										className='hover:text-slate-600 duration-200 cursor-pointer'
										onClick={() => handleCopy(link.url)}
									>
										{link.url.slice(0, 50)}
									</div>
								</Table.Cell>
								<Table.Cell>
									<div
										className='hover:text-slate-600 duration-200 cursor-pointer'
										onClick={() => handleCopy(`${process.env.BASE_URI}/${link.shortCode}`)}
									>
										{`${process.env.BASE_URI}/${link.shortCode}`}
									</div>
								</Table.Cell>
								<Table.Cell>{link.clicks}</Table.Cell>
								<Table.Cell>{timeSince(link.createdAt, true)}</Table.Cell>
								<Table.Cell>{link.notes || '-'}</Table.Cell>
								<Table.Cell>
									{link.password ? <ShowPassword password={link.password} /> : '-'}
								</Table.Cell>
								<Table.Cell>
									<div className='flex flex-row'>
										<Tooltip
											content='עריכת קישור'
											color='warning'
										>
											<button onClick={() => setEditModal({ open: true, linkId: link._id })}>
												<TiEdit
													size={20}
													fill='#979797'
												/>
											</button>
										</Tooltip>

										<Tooltip
											content='מחיקת קישור'
											color='error'
										>
											<button onClick={() => handleDelete(link._id)}>
												<MdOutlineDeleteForever
													size={20}
													fill='#FF0080'
												/>
											</button>
										</Tooltip>
									</div>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			) : (
				<div className='flex flex-col items-center justify-center'>
					<Loading />
					<span>אנא המתן...</span>
				</div>
			)}
			<EditModal
				open={editModal.open}
				setOpen={setEditModal}
				linkId={editModal.linkId}
				mutate={mutate}
			/>
		</div>
	)
}

const ShowPassword = ({ password }) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div
			className={`${showPassword ? 'blur-none' : 'blur-[3px]'} cursor-pointer`}
			onClick={() => setShowPassword(true)}
		>
			{password}
		</div>
	)
}

export default Links
