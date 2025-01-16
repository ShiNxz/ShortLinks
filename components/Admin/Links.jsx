import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Table from '@nextui-org/react/table'
import Loading from '@nextui-org/react/loading'
import Tooltip from '@nextui-org/react/tooltip'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { MdOutlineDeleteForever } from 'react-icons/md'
import Axios from '@/utils/functions/Axios'
import { timeSince } from '@/utils/functions/Time'
import { Title } from '../Pages/Home/Header'
import { Pagination } from '@nextui-org/react'

const AdminLinks = () => {
	const [page, setPage] = useState(1)

	const { data, mutate } = useSWR(`/api/admin/links?page=${page}`, fetcher)

	const handleCopy = async (url) => {
		await navigator.clipboard.writeText(url)
		return toast.success('הקישור הועתק', {
			autoClose: 3000,
			closeButton: true,
			closeOnClick: true,
		})
	}

	const handleDelete = async (id) => {
		const { success, data } = await Axios('/api/admin/links', { id }, 'DELETE')
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
				<>
					<Table
						aria-label='Example table with static content'
						className='w-full'
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
							{data.links?.map((link) => (
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
					<div className='mt-4 flex justify-center'>
						<Pagination
							page={page}
							total={data.total / 10}
							onChange={setPage}
							dir='ltr'
						/>
					</div>
				</>
			) : (
				<div className='flex flex-col items-center justify-center'>
					<Loading />
					<span>אנא המתן...</span>
				</div>
			)}
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

export default AdminLinks
