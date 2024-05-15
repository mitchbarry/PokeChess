import { model, Schema } from 'mongoose'
import { hasBadWords } from 'expletives'

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, `Your username is required.`],
			minlength: [3, `Your username must be at least 3 characters.`],
			maxlength: [16, `Your username can't be more than 16 characters.`],
			validate: {
				validator: async function(username) {
					if (hasBadWords(username)) {
						return false
					}
					return true
				},
				message: `Your username must be appropriate.`
			}
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
			required: [true, 'Password is required!'] // no validations present because hashed password is used to create user object
		},
		starter: {
			type: Number,
			required: [true, 'Starter is required!']
		}
	},
	{ timestamps: true }
)

const User = model('User', UserSchema)

export default User