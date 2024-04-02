import { model, Schema, mongoose} from "mongoose"

const LobbySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Lobby name is required!"],
			minlength: [2, "Lobby name must be at least 2 characters long!"],
			maxlength: [24, "Lobby name must be less than 25 characters long!"]
		},
		description: {
			type: String,
			required: false,
			default: ""
		},
		password: {
            type: String,
            required: false,
            default: ""
        },
		creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
			required: [true, "Creator is required"]
        },
		gameState: {
			type: Object,
			required: true
		}
	},
	{ timestamps: true }
)

const Lobby = mongoose.models.Lobby || model("Lobby", LobbySchema)

export default Lobby;