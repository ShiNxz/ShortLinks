import { openModal } from '@/utils/slices/authSlice'
import { useDispatch } from 'react-redux'
import useAuth from '@/utils/hooks/useAuth'
import { User as NextUser } from '@nextui-org/react'
import { Dropdown } from '@nextui-org/react'
import { ItemStyled } from './Navbar'

import { BsLink45Deg } from 'react-icons/bs'
import { RiUserSettingsLine } from 'react-icons/ri'
import { TbLogout } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

import { useRouter } from 'next/router'

const UserDropdown = () => {
	const { handleLogout, user } = useAuth()
	const router = useRouter()

	const handleAction = (action) => {
		switch (action) {
			case 'profile':
				return router.push(`/user/me`)
			case 'links':
				return router.push(`/account/links`)
			case 'settings':
				return router.push(`/account/settings`)
			case 'logout':
				return handleLogout()

			default:
				return router.push(action)
		}
	}

	return (
		<Dropdown
			placement='bottom-right'
			borderWeight={false}
		>
			<Dropdown.Trigger>
				<NextUser
					src={user.profile?.avatar}
					name={user.profile?.name || user.username}
					description={
						<div
							className='flex flex-row items-center cursor-pointer text-slate-300 hover:text-slate-100 duration-200'
							onClick={() => {}}
						>
							הגדרות <BiChevronDown className='mr-1' />
						</div>
					}
					style={{ direction: 'ltr', marginLeft: 50 }}
					color='primary'
					bordered
					squared
				/>
			</Dropdown.Trigger>
			<Dropdown.Menu
				aria-label='Profile Actions'
				onAction={handleAction}
				disabledKeys={['profile', 'settings']}
			>
				<Dropdown.Item
					icon={<AiOutlineUser className='ml-2' />}
					color='default'
					key='profile'
				>
					מעבר לפרופיל
				</Dropdown.Item>
				<Dropdown.Item
					icon={<BsLink45Deg className='ml-2' />}
					color='default'
					key='links'
				>
					צפייה בקישורים שנוצרו
				</Dropdown.Item>
				{user.role === 'admin' && <Dropdown.Item
					icon={<BsLink45Deg className='ml-2' />}
					color='default'
					key='/admin/links'
				>
					ניהול קישורים
				</Dropdown.Item>}
				<Dropdown.Item
					icon={<RiUserSettingsLine className='ml-2' />}
					color='default'
					key='settings'
				>
					הגדרות משתמש
				</Dropdown.Item>
				<Dropdown.Section>
					<Dropdown.Item
						icon={<TbLogout className='ml-2' />}
						color='error'
						key='logout'
					>
						התנתק
					</Dropdown.Item>
				</Dropdown.Section>
			</Dropdown.Menu>
		</Dropdown>
	)
}

const User = () => {
	const dispatch = useDispatch()
	const { loggedIn } = useAuth()

	return loggedIn ? (
		<UserDropdown />
	) : (
		<>
			<ItemStyled
				className='text-lg mx-2'
				onClick={() => dispatch(openModal('login'))}
			>
				התחברות
			</ItemStyled>
			<ItemStyled
				className='text-lg mx-2'
				onClick={() => dispatch(openModal('register'))}
			>
				הרשמה
			</ItemStyled>
		</>
	)
}

export default User
