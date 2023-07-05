const mongoose =require('mongoose');

const MentorSchema = mongoose.Schema( 
    {
    name:{
       type :String,
       require:true,
    },
    email:{
        type :String,
        require:true,
    },
    description:{
        type :String,
        require:true,
    }
})

module.exports = mongoose.model("Mentor",MentorSchema);