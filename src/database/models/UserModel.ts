import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  notes: {
    type: Schema.Types.ObjectId,
    default: [],
    ref: "Note",
  },
});

const User = model("User", UserSchema, "Users");

export default User;
