import mongoose, { Schema } from 'mongoose'

const LinkSchema = new Schema(
	{
		url: { type: String, required: true },
		shortCode: { type: String, required: true, unique: true },

		clicks: { type: Number, default: 0 },

		password: { type: String, required: false },
		userId: { type: String, required: false },
		notes: { type: String, required: false },

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Links',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

export default mongoose.models.Link || mongoose.model('Link', LinkSchema)
