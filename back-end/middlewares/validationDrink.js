const { Drink } = require("../models/tableSchema")

module.exports = async (req, res) => {

    console.log(req.body);



    const { drinkName, priceForRegular, priceForHalf, priceForLiter, secureUrl } = req.body


    if (!drinkName || !priceForRegular || !priceForHalf || !priceForLiter || !secureUrl) {
        return res.status(404).json({ error: "please fill all fields" })
    }

    Drink.findOne({ drinkName: drinkName })



        .then((drinkExist) => {
            // console.log(dishExist);
            if (drinkExist) {
                console.log("exist");
                return res.status(421).json({ error: "drink already exist" })
            } else {




                const drink = new Drink({ drinkName, priceForRegular, priceForHalf, priceForLiter, secureUrl });

                drink.save().then(() => {
                    res.status(201).json({ message: "drink added" })
                }).catch((err) => {
                    res.status(500).json({ error: "failed to registered" })
                })
            }

        }).catch((err) => {
            console.log(err);
        })

}
