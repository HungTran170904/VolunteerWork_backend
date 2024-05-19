import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema.Types

const StudentSchema = new Schema({
	account: {
		type: ObjectId,
		ref: 'Account',
		required: true,
	},
	name: String,
	faculty: String,
	school: String,
	quote: String,
	attendedActivities: [String],
	gender: Boolean,
	avatarUrl: String,
	phoneNumber: String,
	titles: [String],
	totalPoints: Number,
	dob: Date,
	studentCode: String,
})
const Student = new mongoose.model('Student', StudentSchema)
export default Student
