import mongoose, { Schema } from "mongoose";
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});
export const UserModel = mongoose.model("User", UserSchema);
//# sourceMappingURL=User.js.map