const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const compareUsers = require('../../middleware/compareUsers');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, preferredName, username, email, password } =
      req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email is already used' }] });
      }

      user = await User.findOne({ username });

      // TODO Should allow users with the same username??
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Username is already used' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm', // default image
      });

      user = new User({
        firstName,
        lastName,
        email,
        username,
        avatar,
        password,
      });
      if (preferredName) {
        user.preferredName = preferredName;
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create an empty profile
      let profileFields = {};
      profileFields.user = user.id;
      profileFields.social = {};
      profile = new Profile(profileFields);
      await profile.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  }
);

// @route   PUT /api/users/:user_id
// @desc    Update user's fields
// @access  Private
router.put('/:user_id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(400).json({ error: [{ msg: 'User does not exists' }] });
    }

    const checkStatus = await compareUsers(req.user.id, req.params.user_id);
    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    const {
      firstName,
      lastName,
      preferredName,
      username,
      language,
      email,
      password,
      oldPassword,
    } = req.body;

    // Build user fields
    const userFields = {};
    if (firstName) userFields.firstName = firstName;
    if (lastName) userFields.lastName = lastName;
    if (preferredName || preferredName === '')
      userFields.preferredName = preferredName;
    if (username && user.username !== username) {
      try {
        const userExists = await User.exists({ username });
        if (userExists) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Username is taken' }] });
        }
      } catch (err) {
        res.status(500).json({ error: [{ msg: 'Server error' }] });
      }
      userFields.username = username;
    }
    if (language) userFields.language = language;
    if (email && user.email !== email) {
      try {
        const userExists = await User.exists({ email });
        if (userExists) {
          return res.status(400).json({ errors: [{ msg: 'Email Is Taken' }] });
        }
      } catch (err) {
        res.status(500).json({ error: [{ msg: 'Server error' }] });
      }
      // TODO check email format
      userFields.email = email;
    }
    if (password && oldPassword) {
      if (password.length < 6) {
        return res.status(400).json({
          errors: [
            { msg: 'Please enter a password with 6 or more characters' },
          ],
        });
      }
      if (oldPassword === password) {
        return res.status(400).json({
          errors: [{ msg: 'New password cannot be the same as the old one' }],
        });
      }
      const passwordsMatch = await bcrypt.compare(oldPassword, user.password);

      if (!passwordsMatch) {
        return res.status(400).json({
          errors: [{ msg: 'The old password you have entered is incorrect' }],
        });
      }

      try {
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
      } catch (err) {
        res.status(500).json({ error: [{ msg: 'Server error' }] });
      }
    }

    try {
      updatedUser = await User.findOneAndUpdate(
        { _id: user.id },
        { $set: userFields },
        { new: true } // return the document after update was applied
      );

      return res.json(updatedUser);
    } catch (err) {
      return res.status(500).json({ error: [{ msg: 'Server error' }] });
    }
  } catch (error) {
    return res.status(400).json({ error: [{ msg: 'User does not exists' }] });
  }
});

module.exports = router;
