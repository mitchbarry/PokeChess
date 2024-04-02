import { model, Schema } from "mongoose"

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required!"],
			minlength: [4, "Username must be at least 4 characters long!"],
			maxlength: [25, "Username must be at most 25 characters long!"]
		},
		email: {
			type: String,
			required: [true, "Email is required!"],
			minlength: [7, "Email must be at least 7 characters long!"],
			maxlength: [255, "Email must be at most 255 characters long!"],
			match: [
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
				"Please enter a valid email address"
			]
		},
		password: {
			type: String,
			required: [true, "Password is required!"] // I got rid of the validations on the server side bc passwords will be stored as a bcrypt hash
		},
		favoritePokemon: {
			type: Number,
			required: false
		}
	},
	{ timestamps: true }
)

const User = model("User", UserSchema)


export default User;