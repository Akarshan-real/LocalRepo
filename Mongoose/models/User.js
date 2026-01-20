import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: v => v % 2 === 0,
      message: props => `${props.value} is not even`
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 11
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  hobbies: [String],
  address: addressSchema
});

// Instance method
userSchema.methods.sayHi = function () {
  console.log(`Hi, my name is ${this.name}`);
};

// Static method
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

// Query helper
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// Virtual
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// Middleware
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

export const User = mongoose.model("User", userSchema);
