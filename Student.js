const mongoose =require('mongoose');

const StudentSchema = mongoose.Schema( 
    {
    name:{
       type :String,
       require:true,
    },
    email:{
        type :String,
        require:true,
    },
    grade:{
        type :String,
        require:true,
    }
})

module.exports = mongoose.model("Student",StudentSchema);