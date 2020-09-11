const db = require("../models");
const User = db.user;
const Role = db.role;

exports.findAll = (req, res) => {
  User.find({})
  	.populate('roles')
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!users) {
        return res.status(404).send({ message: "Users Not found." });
      }

      let result = users.map((el)=>{
        return el.toUserJson()
      })
      console.log(result)
      res.status(200).send(result);
    });
};

exports.createCustomer = (req, res) => {
  const user = new User({
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  User.findOne({
    email: user.email
  }, function(err, existingUser) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (existingUser) {
        //updates
        console.log('user is updating', existingUser);
        User.updateOne(user, {email: user.email}, function(err, updateResult) {
          res.status(200).send(user);  
        })
    } else {
      Role.findOne({ name: 'customer' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
         
          res.status(200).send(user);
        });
      });
    }
  })      
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
