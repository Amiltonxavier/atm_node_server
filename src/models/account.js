import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BankSchema = new Schema({

    accounttype: {
        type: String,
        required: true,
        enum: [0, 1],
    },
    accountnumber: {
        type: String,
        required: true,
        unique: true

    },
    countdeposit: {
        type: Number,
        required: true,
        default: 0 
    },
    countwithdraw: {
        type: Number,
        required: true,
        default: 0
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
},
    {timestamps: true}
);


const Bank = mongoose.model('AccountBank', BankSchema);
export default Bank;