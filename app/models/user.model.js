const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    user_url: String,
    createdAt: Date,
    updatedAt: Date,
    activation_key: String,
    status: String,
    first_name: String,
    last_name: String,
    display_name: String,
    phone: String,
    customer_number: String,
    billing_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address'
    },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'address'
    },
    billing_company: String,
    shipping_company: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
      }
    ]
  })

UserSchema.methods.toUserJson = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    phone: this.phone,
    customer_number: this.customer_number,
    billing_address: this.billing_address,
    shipping_address: this.shipping_address,
    billing_company: this.billing_company,
    shipping_company: this.shippping_company,
    roles: this.roles,
    user_url: this.user_url,
    createdAt: this.createdAt,
    activation_key: this.activation_key,
    status: this.status,
    display_name: this.display_name,
  }
}

const User = mongoose.model(
  "users",
  UserSchema
);

module.exports = User;
