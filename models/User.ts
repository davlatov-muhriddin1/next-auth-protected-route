import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = models.User || model("User", userSchema);
export default User;
