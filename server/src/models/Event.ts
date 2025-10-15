import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
});



const Event = mongoose.model('Event', eventSchema);

export default Event;
