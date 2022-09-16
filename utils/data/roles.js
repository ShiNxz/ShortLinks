const Roles = {
	'Member': {
		id: 'member', // The id that will be saved in the db
		title: 'משתמש רגיל', // The title that will be displayed to the user
		default: true, // will be applied immedietly to new users
		description: 'משתמש דיפולט', // The description
		permissions: [{ create: true }], // ? example TODO: add permissions system
		rank: 0, // Immunity Level
		style: 'bg-blue-600', // The style of the badge
	},

	'Premium Member': {
		id: 'premium_member',
		title: 'משתמש פרימיום',
		description: 'משתמש שהגיע ל-1000 כניסות / יצר 50 קישורים',
		permissions: [{ create: true }],
		rank: 1,
		style: 'bg-blue-600',
	},

	'Banned Member': {
		id: 'banned',
		title: 'משתמש חסום',
		description: 'משתמש חסום',
		permissions: [{ create: false }],
		rank: -1,
		style: 'bg-blue-600',
	},

	'Admin': {
		id: 'admin',
		title: 'אדמין',
		description: 'גישה לפאנל הניהול & משתמשים, אזהרות וכו',
		permissions: [{ create: true }],
		rank: 99,
		style: 'bg-blue-600',
	},

	'Owner': {
		id: 'owner',
		title: 'מנהל האתר',
		description: 'מנהל האתר',
		permissions: [{ create: true }],
		rank: 100,
		style: 'bg-blue-600',
	},
}

export const StaffBadge = ({ id }) => {
	const Role = Roles.filter((role) => role.id == id)[0]
	return <div className={`${Role.style} text-sm rounded-xl px-3 py-1.5`}>{Role.title}</div>
}

/**
 * @param {Any} 		identifier 	The identifier of the role
 * @param {String} 		by 			The property to search by
 * @returns null or object
 */
export const getRole = (identifier, by = 'id') => {
	let role = Object.entries(Roles).filter(([_, value]) => value[by] == identifier)
	if (role.length < 1) return null
	return { _: role[0][0], ...role[0][1] }
}

export default Roles
