const express = require("express");
const router = express.Router();
const valid = require("../middlewares/signupMiddileware");
const contro = require("../controllers/signup.contr");
var csrf = require("csurf");
const csrfProtect = csrf({ cookie: true });
const signModel = require("../models/user");
const isAdmin = require("../util/aurth");
const month = require("../models/month");
router.get("/sign", csrfProtect,isAdmin, async (req, res) => {
  const model = await contro.getstudent();
  res.render("admin/sign.ejs", {
    validator: req.flash("errorMsg"),
    csrfToken: req.csrfToken(),
    check: req.flash("errorCard"),
    student: model,
  });
});
router.get("/removestudent/:cardNumber", isAdmin, contro.removeStudnet);
router.post("/sign", csrfProtect,isAdmin, contro.postInfo);
router.get("/editStudent/:id", csrfProtect, isAdmin, async (req, res) => {
  try {
    let id = req.params.id;
    const getStudent = await signModel.findOne({ _id: id });
    const selectMonth = await month.find({educetionlevel:getStudent['educetionlevel'],grade:getStudent['grade']});
    if (getStudent) {
      res.render("admin/editStudent.ejs", {
        csrfToken: req.csrfToken(),
        student: getStudent,
        month: selectMonth
      });
    } else {
      res.redirect("/student");
    }
  } catch (err) {
    res.sendStatus(400);
  }
});
router.post("/editStudent/:id", csrfProtect, isAdmin, async (req, res) => {
  try {
    let id = req.params.id;
    await signModel.findByIdAndUpdate(
      { _id: id },
      {
        fullName: req.body.fullName,
        cardNumber: req.body.cardNumber,
        phoneNumber: req.body.phoneNumber,
        educetionlevel: req.body.educetionlevel,
        grade: req.body.grade,
        group: req.body.group,
        admin: req.body.admin,
        month: req.body.month,
        }
    );
    res.redirect("/student");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});
module.exports = router;
 
