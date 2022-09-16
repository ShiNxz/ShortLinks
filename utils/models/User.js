import mongoose, { Schema } from 'mongoose'
import { getRole } from '@/data/roles'

const UserSchema = new Schema(
	{
		userId: { type: String, required: true, unique: true },

		// auth
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		// User role (member, admin, etc.)
		role: { type: String, required: true, default: getRole(true, 'default').id },

		// User tokens - Used for password reset, email confirmation, etc.
		tokens: {
			confirm: { type: String, required: true },
			reset: { type: String, required: false },
		},

		// User Profile Customization
		profile: {
			name: { type: String, required: false },
			avatar: { type: String, required: true, default: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
		},

		// user links
		links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],

		// user warnings
		warnings: [{ type: Schema.Types.ObjectId, ref: 'Warning' }],

		// ? adverts -> send the user ads to his email
		adverts: { type: Boolean, required: true },

		// Save the user IP address on every login for security reasons
		loginAttempts: [String],

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Users',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
