const { KitchenOrder, ReceptionOrder } = require('../models/tableSchema')

module.exports = async (req, res) => {

    const { tableNo, total, totalOrder,date , time } = req.body;
    console.log(tableNo)
    if (!totalOrder[0]) {
        return res.status(404).json({ error: "please select dish first" })
    }
    const orderExistInReception = await ReceptionOrder.findOne({ tableNo: tableNo });
    // console.log(orderExistInReception + "hey");



    KitchenOrder.findOne({ tableNo: tableNo })
        .then((orderExist) => {
            if (orderExist) {
                KitchenOrder.findOneAndUpdate(
                    { tableNo: tableNo },
                    { $push: { totalOrder }, $inc: { total } })
                    .then(updatedDocument => {
                        if (updatedDocument) {
                            ReceptionOrder.findOneAndUpdate(
                                { tableNo: tableNo },
                                { $push: { totalOrder }, $inc: { total } })
                                .then(updatedDocument => {
                                    if (updatedDocument) {
                                        console.log(`Successfully updated document: ${updatedDocument}.`)
                                        return res.status(201).json({ message: "order updated" })

                                    } else {
                                        console.log("No document matches the provided query.")
                                        return res.status(421).json({ message: "order not updated" })

                                    }
                                })
                                .catch(err => console.error(`Failed to find and update document: ${err}`))
                        } else {
                            console.log("No document matches the provided query.")
                            return res.status(421).json({ message: "order not updated" })

                        }
                    })
                    .catch(err => console.error(`Failed to find and update document: ${err}`))



            } else if (orderExistInReception) {
                ReceptionOrder.findOne({ tableNo: tableNo })
                    .then((billExist) => {
                        if (billExist) {
                            ReceptionOrder.findOneAndUpdate(
                                { tableNo: tableNo },
                                { $push: { totalOrder }, $inc: { total } })
                                .then(updatedDocument => {
                                    if (updatedDocument) {
                                        const kitchenorder = new KitchenOrder({ tableNo, total, totalOrder, time,date });
                                        kitchenorder.save().then(() => {
                                            return res.status(201).json({ message: "order added" })
                                        }).catch((err) => {
                                            return res.status(500).json({ error: "failed to registered" })
                                        })

                                    } else {
                                        console.log("No document matches the provided query.")
                                        return res.status(421).json({ message: "order not updated" })

                                    }
                                })
                                .catch(err => console.error(`Failed to find and update document: ${err}`))

                        }
                    })


            }
            else {
                const kitchenorder = new KitchenOrder({ tableNo, total, totalOrder, time ,date });
                const receptionorder = new ReceptionOrder({ tableNo, total, totalOrder, time ,date});

                kitchenorder.save().then(() => {
                    return res.status(201).json({ message: "order added" })
                }).catch((err) => {
                    return res.status(500).json({ error: "failed to registered" })
                })
                receptionorder.save().then(() => {
                    
                }).catch((err) => {
                
                })
            }

           


        }).catch((err) => {
            console.log(err);
        })



}