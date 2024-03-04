const mongoose = require('mongoose');

const EventModel = mongoose.Schema({
  phone_number:Number,
  priority:Number,
  id:Number
});
const EventSchema = mongoose.model("Event", EventModel);
module.exports = EventSchema;

