const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")


const tableSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["table", "admin", "chief"],
        default: "table"
    },
    token: {
        type: String,
    }
    });
const feedbackSchema = new mongoose.Schema({
    quality: {
        type: Number,
        required: true
    },
    service: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        // required: true
    },
});

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const cheifSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const orderSchema = new mongoose.Schema({
    tableNo: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    totalOrder: [{
        type: Object,
        required: true
    }
    ],
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
});


const totalOrdersSchema = new mongoose.Schema({
    tableNo: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    totalOrder: [{
        type: Object,
        required: true
    }
    ],
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
});



const pizzaSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    dishIngri: {
        type: String,
        required: true
    },
    priceForSmall: {
        type: Number,
        required: true
    },
    priceForMedium: {
        type: Number,
        required: true
    },
    priceForLarge: {
        type: Number,
        required: true
    },
    secureUrl: {
        type: String,
        required: true
    }
});

const drinkSchema = new mongoose.Schema({
    drinkName: {
        type: String,
        required: true
    },
    priceForRegular: {
        type: Number,
        required: true
    },
    priceForHalf: {
        type: Number,
        required: true
    },
    priceForLiter: {
        type: Number,
        required: true
    },
    secureUrl: {
        type: String,
        required: true
    }
})


// we are generating token
tableSchema.methods.generateAuthToken = async function () {

    try {

        let token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET);
        this.token =  token;
        await this.save();
        return token;


    } catch (error) {
        console.log(error);
    }
}


const Table = mongoose.model('TABLE', tableSchema);
const Pizza = mongoose.model('Pizza', pizzaSchema);
const Specialpizza = mongoose.model('SpecialPizza', pizzaSchema);
const Drink = mongoose.model('Drink', drinkSchema);
const KitchenOrder = mongoose.model('KitchenOrder', orderSchema);
const ReceptionOrder = mongoose.model('ReceptionenOrder', orderSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Cheif = mongoose.model('cheif', cheifSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);
const TotalOrder = mongoose.model('TotalOrder', totalOrdersSchema);

module.exports = { Table, Pizza, Feedback, Specialpizza, Drink, KitchenOrder, ReceptionOrder, Cheif, Admin, TotalOrder };