import mongoose from 'mongoose';


const CompilerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
});


const LanguageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    mode:{
        type:String,
        required:true
    },
    compilers:[CompilerSchema],
    precode:{
        type:String,
        required:true
    }
});

export default mongoose.model('Languages', LanguageSchema);