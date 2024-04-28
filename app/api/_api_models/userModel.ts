import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

// Define the interface for the User document
interface UserDocument extends Document {
  username: string;
  role: string;
  password: string;
  status: string;
  isPasswordCorrect(
    candidatePassword: string,
    userPasswordStoredInDB: string
  ): Promise<boolean>;
  [key: string]: any;
}

// Define the enum for user statuses
const Status = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
};

// Define the enum for user roles
const Role = {
  USER: "user",
  ADMIN: "admin",
};

/* =======================================================================
          UserSchema
   ======================================================================= */
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      unique: true,
      maxlength: [50, "name must contain less than 50 characters"],
      minlength: [4, "name must contain more than 2 characters"],
    },
    role: {
      type: String,
      enum: Object.values(Role), // Ensure role is one of the enum values
      default: Role.USER, // Set default role
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [8, "password must contain atleast 8 characters"],
      select: false,
    },
    status: {
      type: String,
      enum: Object.values(Status), // Ensure status is one of the enum values
      default: Status.ACTIVE, // Set default status
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
//-----------------------------------------------------------------

//-----------------------------------------------------------------
UserSchema.methods.isPasswordCorrect = async function (
  candidatePassword: string,
  userPasswordStoredInDB: string
) {
  return await bcrypt.compare(candidatePassword, userPasswordStoredInDB); //comparing un encrypted passowrd(candidate password) with encrpted password-in this bcrypt automatically encrypts candidatepassword and compares it with userpassword
};
//-----------------------------------------------------------------

export default mongoose.models?.users || mongoose.model("users", UserSchema);
