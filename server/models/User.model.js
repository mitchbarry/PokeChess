import { model, Schema } from 'mongoose'
import { hasBadWords } from 'expletives'

const passwordValidator = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$|^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).+$|^(?=.*[0-9])(?=.*[^a-zA-Z0-9\s]).+$/
    return passwordRegex.test(password)
}

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
			required: [true, 'Password is required!'],
			minlength: [8, `Your password must be at least 8 characters.`],
			maxlength: [255, `Your password can't be more than 255 characters.`],
			validate: {
				validator: passwordValidator,
				message: `Your password must include at least two of the following; letter, number, or symbol.`
			}
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