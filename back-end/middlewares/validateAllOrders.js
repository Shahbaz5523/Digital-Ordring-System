const { TotalOrder, ReceptionOrder } = require("../models/tableSchema")

module.exports = async (req, res) => {
    console.log(req.body);

    const { tableName } = req.body

    ReceptionOrder.findOneAndDelete({ tableNo: tableName })
        .then((tableExist) => {
            console.log(tableExist);

            const { tableNo, total, time, date, totalOrder } = tableExist

            const order = new TotalOrder({ tableNo, total, time, date, totalOrder })

            order.save().then(() => {
                console.log("order added");
            }).catch((err) => {
                console.log("order not added");
            })
        }).catch((err) => {
            console.log(err);
        })
}