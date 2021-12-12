const express = require('express')
const router = express.Router()
const GoogleAuthenticator = require('passport-2fa-totp').GoogeAuthenticator;
const db = require('../../models')
const User = db.User
const moment = require('moment')

const speakeasy = require('speakeasy')
const QRCode = require('qrcode');

router.get('/setup-2fa', (req, res) => {
  var errors = req.flash('setup-2fa-error');
  // var qrInfo = GoogleAuthenticator.register(req.user.email);
  // req.session.qr = qrInfo.secret;

  var secret = speakeasy.generateSecret({ length: 20 });
  req.session.qr = secret.base32
  QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
    console.log("======secret======")
    console.log(req.session.qr)
    console.log("======secret======")
    return res.render('setup-2fa', {
      errors: errors,
      qr: '<img src="' + data_url + '">'
    });
  })

})

router.post('/setup-2fa', (req, res) => {
  res.render('login-otp')
})


router.post('/verify-otp', (req, res) => {
  if (!req.session.qr) {
    req.flash('setup-2fa-error', 'The Account cannot be registered. Please try again.');
    return res.redirect('/users/login');
  }
  // let token = speakeasy.totp({
  //   secret: req.session.qr,
  //   encoding: 'base32',
  // });
  console.log(req.session.qr)
  // console.log(token)

  var tokenDelta = speakeasy.totp.verifyDelta({
    secret: req.session.qr,
    encoding: 'base32',
    token: req.body.otp,
    step: 30
  });
  console.log("======tokenDelta======")
  console.log(tokenDelta)
  console.log("======tokenDelta======")

  if (!tokenDelta || tokenDelta > 60) {
    return res.redirect('/users/login');
  }


  return res.redirect('/');





  // User.findOne({ where: { email } })
  //   .then(user => {

  //     if (err) {
  //       req.flash('setup-2fa-error', err);
  //       return res.redirect('/setup-2fa');
  //     }

  //     if (!user) {   // User is not found. It might be removed directly from the database.
  //       req.logout();
  //       return res.redirect('/');
  //     }

  //     User.update(user, { $set: { secret: req.session.qr } }, function (err) {
  //       if (err) {
  //         req.flash('setup-2fa-error', err);
  //         return res.redirect('/setup-2fa');
  //       }

  //       res.redirect('/profile');
  //     });
  //   });

})




module.exports = router