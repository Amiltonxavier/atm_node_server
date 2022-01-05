import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        min: 8,  
    },
    genero: {
        type: String,
        required: true,
        enum: ['M', 'F']

    },
    phone: {
        type: Number,
        required: true,
        min: 9

    },
    email: {
        type: String,
        required: true,
        unique: true  
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
      isActived: {
        type: Number,
        enum: [0, 1],
        default: 0
    },

    user: { type: ObjectId, ref: "AccountBank" }

},
{timestamps: true}
);


const User = mongoose.model('User', UserSchema);
export default User;