import { model, Schema } from 'mongoose'
import { hasBadWords } from 'expletives'

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Your username is required.'],
			minlength: [3, 'Your username must be at least 3 characters.'],
			maxlength: [16, 'Your username can\'t be more than 16 characters.'],
			validate: [
				{
					validator: async (username) => {
						if (hasBadWords(username)) {
							return false;
						}
						return true;
					},
					message: 'Your username must be appropriate.'
				},
				{
					validator: (username) => /^[a-zA-Z0-9\s]+$/.test(username),
					message: `Your username can't contain special characters.`
				}
			]
		},
		email: {
			type: String,
			required: [true, `Your email is required.`],
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				`Please enter a valid email.`
			]
		},
		password: {
			type: String,
			required: [true, 'Your password is required.'] // no validations present because hashed password is used to create user object
		},
		starter: {
			type: Number,
			required: false,
			default: 0
		}
	},
	{ timestamps: true }
)

const User = model('User', UserSchema)

export default User