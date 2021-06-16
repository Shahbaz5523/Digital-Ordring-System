const { Table } = require("../models/tableSchema")

module.exports = (req, res) => {
    // console.log(req.body);
    const { username, password, cpassword } = req.body

    if (!username || !password || !cpassword) {
        return res.json({ error: "please fill all fields" })
    }

    Table.findOne({ username: username })
        .then((tableExist) => {
            if (tableExist) {
                return res.status(422).json({ error: "table already exist" })
            }
            if(password != cpassword){
                return res.status(422).json({ error: "please enter same password" })

            }



            const table = new Table({ username, password, cpassword });

            table.save().then(() => {
                res.status(201).json({ message: "table added" })
            }).catch((err) => {
                res.status(500).json({ error: "failed to registered" })
            })

        }).catch((err) => {
            console.log(err);
        })


    
   
}