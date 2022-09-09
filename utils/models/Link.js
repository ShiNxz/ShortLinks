import mongoose from 'mongoose'

const LinkSchema = new mongoose.Schema(
	{
		url: { type: String, required: true },
		shortCode: { type: String, required: true },

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
