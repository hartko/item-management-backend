const authService = require('./auth.service');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ ok: false, errors: errors.array() });
    }
    const auth = await authService.login(req.body);
    if (!auth) {
      return res.status(200).json({
        ok: false, errors: [{
          "msg": "Email or Password is incorrect",
        }]
      });

    } else {
      res.status(200).json({
        ok: true,
        token: auth.token
      });
    }

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error
    });
  }
};

exports.register = async (req, res) => {
  // try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ ok: false, errors: errors.array() });
    }
    const auth = await authService.register(req.body);
    res.status(200).json({
      ok: true,
      msg: "Registration successful"
    });
  // } catch (error) {
  //   res.status(500).json({
  //     ok: false,
  //     msg: error
  //   });
  // }
};
