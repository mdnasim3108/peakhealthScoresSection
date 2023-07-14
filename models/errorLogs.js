import { Schema, model, models } from "mongoose";
var errorLogsSchema = new Schema(
  {
    ip:{type:String},
    browser:{type:String},
    error:{type:Object},
    errorText:{type:String}
  },
  { timestamps: true }
);

var errorLogs = models.errorLogs || model("errorLogs", errorLogsSchema);

export default errorLogs;