import User from "../models/User.model.js"

const userController = {
	async getAllUsers(req, res, next) {
		try {
			const allUsers = await User.find()
			res.json(allUsers)
		} catch (error) {
			next(error)
		}
	},

	async getOneUser(req, res, next) {
		try {
			const id = req.params.id
			const foundUser = await User.findById(id)
			res.json(foundUser)
		} catch (error) {
			next(error)
		}
	},

	async updateOneUser(req, res, next) {
		const options = {
			new: true,
			runValidators: true,
		}
		try {
			const id = req.params.id
			const updatedUser = await User.findByIdAndUpdate(
				id,
				req.body,
				options
			)
			res.json(updatedUser)
		} catch (error) {
			next(error)
		}
	},

	async deleteOneUser(req, res, next) {
		try {
			const id = req.params.id
			const deletedUser = await User.findByIdAndDelete(id)
			res.json(deletedUser)
		} catch (error) {
			next(error)
		}
	},
}

export default userController;