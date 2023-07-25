import { Schema, model, models } from "mongoose";
var challengeSchema = new Schema(
  {
    
    id:{type:Number},
    name:{type:String},
    description:{type:String},
    difficultyLevel:{type:String},
    interventionType:{type:String},
    outcomes:{type:String},
    duration:{type:String},
    instructions:{type:String},
    goal:{type:String},

  },
  { timestamps: true }
);

var challenges = models.challenges || model("challenges", challengeSchema);

export default challenges;