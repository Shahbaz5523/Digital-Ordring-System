const { Admin, Table, Cheif } = require("../models/tableSchema");

module.exports = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "please fill the data" });
    }

    if (username === "admin") {
      const adminLogin = await Admin.findOne({ username: username });
      console.log(adminLogin + "hello");
      if (!adminLogin) {
        return res.json({ error: "invalid cridentials" });
      } else {
        console.log(adminLogin.password);
        if (adminLogin.password === password) {
          console.log("matched");
          return res.status(202).json({ data: adminLogin });
        } else {
          console.log("not matched ");
          return res.json({ error: "invalid cridentials" });
        }
      }
    } else if (username === "chef") {
      const cheifLogin = await Cheif.findOne({ username: username });
      console.log(cheifLogin);
      if (!cheifLogin) {
        return res.json({ error: "invalid cridentials" });
      } else {
        console.log(cheifLogin.password);
        if (cheifLogin.password === password) {
          console.log("matched");
          return res.status(202).json({ data: cheifLogin });
        } else {
          console.log("not matched ");
          return res.json({ error: "invalid cridentials" });
        }
      }
    } else {
      const tableLogin = await Table.findOne({ username: username });
      console.log(tableLogin);
      if (!tableLogin) {
        return res.json({ error: "invalid cridentials" });
      } else {
        console.log(tableLogin.password);
        if (tableLogin.password === password) {
          console.log("matched");
          const token = await tableLogin.generateAuthToken();
          console.log(token);

          res.cookie("jwToken", token, {
            expires: new Date(Date.now() + 5 * 60 * 1000),
            httpOnly: true,
          });
          return res.status(202).json({ data: tableLogin });

          // const token = jwt.sign({name : tableLogin.username},process.env.TOKEN_SECRET);
          // console.log(token)
          // return res.status(202).json({ data: {name:tableLogin.username,token:token} })
        } else {
          console.log("not matched ");
          return res.json({ error: "invalid cridentials" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
