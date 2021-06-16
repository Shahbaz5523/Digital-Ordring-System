const { Pizza } = require('../models/tableSchema')

module.exports = async (req, res) => {
    console.log(req.body)

 
    const { dishName, dishIngri, priceForSmall, priceForMedium, priceForLarge ,secureUrl } = req.body;
    


    if (!dishName || !dishIngri || !priceForSmall || !priceForMedium || !priceForLarge || !secureUrl) {
        return res.status(404).json({ error: "please fill all fields" })
    }

    Pizza.findOne({ dishName: dishName })

        .then((dishExist) => {
          
            if (dishExist) {
                console.log("exist");
                return res.status(421).json({ error: "Dish already exist" })
            } else {



                const pizza = new Pizza({ dishName, dishIngri, priceForSmall, priceForMedium, priceForLarge, secureUrl });

                pizza.save().then(() => {
                    res.status(201).json({ message: "dish added" })
                }).catch((err) => {
                    res.status(500).json({ error: "failed to registered" })
                })
            }

        }).catch((err) => {
            console.log(err);
        });
}





