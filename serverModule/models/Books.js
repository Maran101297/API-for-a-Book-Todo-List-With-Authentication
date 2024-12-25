const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { 
      type: String, 
      required: true 
  },
  author: { 
      type: String,
      required: true 
  },
  year: { 
      type: String,
      required: true 
  },
  priority: { 
      type: String, 
      default: 'Normal' 
  },
  status: {
      type: String,
      enum: ['Pending', 'Completed']
  },
  action: {
      type: Boolean,
      default: false
  },
  user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
  },
}, { timestamps: true });

// pre-save hook is a middleware function that runs before a document is saved to the database.
BookSchema.pre('save', async function (next) {
  const modelExsits = mongoose.models[this.constructor.modelName]
  if(!modelExsits){
    mongoose.model(this.constructor.modelName, BookSchema)
  }
  next();
  
  });


module.exports = mongoose.model('Book', BookSchema);
