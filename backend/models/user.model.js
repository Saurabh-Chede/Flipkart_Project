import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true },

  email: { 
    type: String, 
    unique: true, 
    required: true },

  password: { 
    type: String, 
    required: true },

  role: { 
    type: String, 
    default: "user", 
    enum: ["user", "seller", "admin"] },
  
  sellerRequestStatus: {
   type: String,
   enum: ["none", "pending", "approved", "rejected"],
   default: "none",
}
});

const UserModel = model("User", UserSchema);

export default UserModel;