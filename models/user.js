import { Schema, model, models } from "mongoose";
//import { Schema, model, models } from "mongoose";
//datas and their data type which are stored our monoose database
var userSchema = new Schema(
  {
    ip: { type: String },
    username: { type: String },
    email: { type: String },
    gender: { type: String },
    year: { type: String },
    score: { type: String },
    voiceFeatures: { type: Array },
    guessScore:{type:String},
    audio:{type:String}
  },
  { timestamps: true }
);

var peakHealthUsers = models.peakHealthUsers || model("peakHealthUsers", userSchema);

export default peakHealthUsers;
