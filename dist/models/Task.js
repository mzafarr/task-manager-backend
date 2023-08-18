import mongoose, { Schema } from "mongoose";
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    dueDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["completed", "in-progress", "pending"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
export const TaskModel = mongoose.model("Task", TaskSchema);
//# sourceMappingURL=Task.js.map