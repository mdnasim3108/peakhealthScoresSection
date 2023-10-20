import { Schema, model, models } from "mongoose";
var challengeSchema = new Schema(
  {
    
    Challenge_ID:{type:Number},
    Challenge_Title:{type:String},
    Challengers_Count:{type:Number},
    description:{type:String},
    Challenge_Effort:{type:String},
    interventionType:{type:String},
    outcomes:{type:String},
    Challenge_Time:{type:String},
    Challenge_Instructions:{type:String},
    Challenge_Positive_Reinforcement:{type:String},
    Challenge_Negative_Reinforcement:{type:String},
    Challenge_Feedback_Question:{type:String},
    Challenge_Feedback_Answers:{type:String},
    Challenge_Feedback_Voice:{type:String},
    Goal_Name:{type:String},

  },
  { timestamps: true }
);

var challenges = models.challenges || model("challenges", challengeSchema);

export default challenges;