import { Schema, model, models } from "mongoose";
var infoLogsSchema = new Schema(
  {
    info:{type:Object}
  },
  { timestamps: true }
);

var infoLogs = models.infoLogs || model("infoLogs", infoLogsSchema);

export default infoLogs;