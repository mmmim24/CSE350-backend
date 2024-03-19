const mongoose =  require('mongoose')

const complaint =  new mongoose.Schema({
    date:{
        type:String 
    },
    ID:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["In Progress", "Processing", "Resolved"],
        required:true
    },
    fullName :String,
    contact:String,
    known:String,
    info:String,
    incident:String,
    notes:{
        exist:Boolean,
        date:[String],
        note:[String]
    }
})

module.exports = mongoose.model("complaints",complaint);
