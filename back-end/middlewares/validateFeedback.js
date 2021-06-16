const {Feedback} = require("../models/tableSchema")

module.exports =  (req , res) =>{
    console.log(req.body);
    const { quality, service, comments ,number } = req.body
    // console.log(order);

    if (!quality || !service) {
        return res.status(404).json({ error: "please rate us in stars" })
    }
    if(!number){
        return res.status(404).json({ error: "please Enter Your Number" })

    }
    if(number.length < 11){
        return res.status(404).json({ error: "please Enter valid number" })

    }

        const feedback = new Feedback({quality, service, comments ,number });


                feedback.save().then(() => {
                    res.status(201).json({ message: "feedback added" })
                }).catch((err) => {
                    res.status(500).json({ error: "failed to add feedback" })
                })
            


        
    
}