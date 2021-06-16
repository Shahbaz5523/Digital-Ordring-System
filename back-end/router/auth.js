const express = require("express");
const router = express.Router();
const validationDrink = require("../middlewares/validationDrink.js");
const validationPizza = require("../middlewares/validationPizza.js");
const validationSpecialPizza = require("../middlewares/validationSpecialPizza.js");
const validationTable = require("../middlewares/validationTable");
const validationAddOrder = require("../middlewares/validationAddOrder");
const validateFeedback = require("../middlewares/validateFeedback");
const validateLogin = require("../middlewares/validateLogin");
const validateAllOrders = require("../middlewares/validateAllOrders.js");
const jwt = require("jsonwebtoken");

require("../db/conn");
const {
  Table,
  ReceptionOrder,
  Pizza,
  Specialpizza,
  Drink,
  KitchenOrder,
  Admin,
  Cheif,
  Feedback,
  TotalOrder,
} = require("../models/tableSchema");

router.get("/", (req, res) => {
  res.send("hello sheikh from server router");
});
// get order from reception and deleteit fromreceptionorder and add it to alla orders
router.post("/deleteOrderfromReception", validateAllOrders);

// get feedback from userpanel
router.post("/addfeedback", validateFeedback);

// add table router
router.post("/addtable", validationTable);

// add pizza to database
router.post("/addpizza", validationPizza);

// add special pizza to database
router.post("/addspecialpizza", validationSpecialPizza);

// add  drinks to database
router.post("/adddrink", validationDrink);

// send order to database
router.post("/addorder", validationAddOrder);

// signin router
router.post("/login", validateLogin);

// get allOrders to adminpanel
router.get("/getallorders", async (req, res) => {
  try {
    const allorders = await TotalOrder.find({});
    res.send({ data: allorders });
  } catch (error) {
    res.status(402).send({ error: "failed to get data" });
  }
});

// get todaysOrders to adminpanel
router.get("/gettodaysorders", async (req, res) => {
  try {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${today.getMonth() + 1}`;
    }
    if (day < 10) {
      day = `0${today.getDate()}`;
    }

    let date = `${year}-${month}-${day}`;

    const todaysOrders = await TotalOrder.find({ date: date });

    res.send({ data: todaysOrders });
  } catch (error) {
    res.status(402).send({ error: "failed to get data" });
  }
});

// get selectedDateorders to adminpanel
router.post("/getselecteddateorder", async (req, res) => {
  try {
    const { date } = req.body;

    const todaysOrders = await TotalOrder.find({ date: date });
    res.send({ data: todaysOrders });
  } catch (error) {
    res.status(402).send({ error: "failed to get data" });
  }
});

// get feedback to admin
router.get("/getfeedback", async (req, res) => {
  try {
    const feedback = await Feedback.find({});
    res.send({ data: feedback });
  } catch (error) {}
});

router.get("/getkitchenorder", async (req, res) => {
  try {
    const orders = await KitchenOrder.find({});
    res.send({ data: orders });
  } catch (error) {}
});

router.get("/receptionorder", async (req, res) => {
  try {
    const orders = await ReceptionOrder.find({});
    res.send({ data: orders });
  } catch (error) {}
});

router.get("/getpizza", async (req, res) => {
  try {
    const orders = await Pizza.find({});
    // console.log(orders);
    res.send({ data: orders });
  } catch (error) {}
});

router.get("/getspecialpizza", async (req, res) => {
  try {
    const orders = await Specialpizza.find({});
    // console.log(orders);
    res.send({ data: orders });
  } catch (error) {}
});

router.get("/getdrink", async (req, res) => {
  try {
    const orders = await Drink.find({});
    // console.log(orders);
    res.send({ data: orders });
  } catch (error) {}
});

module.exports = router;
