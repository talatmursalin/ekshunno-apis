import {Schema, model} from 'mongoose';

const room = new Schema({
    name:{
        type:String,
        unique: true,
        required: true
    },
    created:{
        type:Date,
        default:Date.now
    }
});

export default model('Rooms', room);