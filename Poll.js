const {Schema,model} = require('mongoose')

const PollSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true //সাজাইয়া রাখা
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    totalVote: {
        type: Number,
        default: 0
    },
    options: {
        type:[{
            name: String,
            vote: Number
        }]
    }

})

const Poll = model("Poll",PollSchema)
module.exports =  Poll