const mongoose = requires("mongoose")

const NewsletterSchem = mongoose.schema({
    email:{
        type: String,
        unique: true
    }
})

module.exports=mongoose.model("Newsletter", NewsletterSchem)