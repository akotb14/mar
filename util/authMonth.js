const jwt = require("jsonwebtoken");
const auth = require("../models/user");
const isMonth = async(req, res, nxt) => {
  let student = jwt.verify(req.cookies.student, process.env.SecretPassword);
  if (student) {
    let s = student.studentCard;
    let month = req.params.month;
    const user = await auth.findOne({_id:s});

    if(user.month.includes(month) ){
        nxt();
    }else{
        return res.sendStatus(404);
    }
    
  } else {
    return res.sendStatus(404);
  }
};

module.exports = isMonth;