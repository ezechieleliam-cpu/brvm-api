import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const LogModel = mongoose.model('Log', logSchema);
export default LogModel;
