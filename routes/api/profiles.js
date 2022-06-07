const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const checkRole = require('../../middleware/checkRole');
const compareUsers = require('../../middleware/compareUsers');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET /api/profiles/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/profiles/:user_id
// @desc    Create or update a user profile
// @access  Private
router.post(
  '/:user_id',
  [auth, [check('status', 'Status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userExists = await User.exists({ _id: req.params.user_id });
      if (!userExists) {
        return res.status(400).send('User does not exists');
      }
    } catch {
      return res.status(400).send('User does not exists');
    }

    const checkStatus = await compareUsers(req.user.id, req.params.user_id);
    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    const {
      status,
      bio,
      githubUsername,
      linkedin,
      youtube,
      facebook,
      instagram,
      twitter,
    } = req.body;

    // Build profile objects
    const profileFields = {};
    profileFields.user = req.params.user_id;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubUsername) profileFields.githubUsername = githubUsername;
    /* if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    } */

    // Build social object
    profileFields.social = {};
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      let profile = await Profile.findOne({ user: req.params.user_id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndReplace(
          { user: req.params.user_id },
          profileFields,
          { new: true } // return the document after update was applied
        );

        return res.json(profile);
      }

      // Create profile
      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/profiles
// @desc    Get all profiles
// @access  Private
router.get('/', [auth, checkRole()], async (_req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstName',
      'lastName',
      'preferredName',
      'email',
      'username',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profiles/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', [
      'firstName',
      'lastName',
      'preferredName',
      'avatar',
      'email',
      'username',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/profiles/:user_id
// @desc    Delete account (profile, user and his/her articles)
// @access  Private
router.delete('/:user_id', auth, async (req, res) => {
  const checkStatus = await compareUsers(req.user.id, req.params.user_id);
  if (checkStatus == 401 || checkStatus == 500)
    return res
      .status(checkStatus)
      .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

  try {
    //TODO Delete comments and articles

    // Delete profile
    await Profile.findOneAndRemove({ user: req.params.user_id });

    // Delete user
    await User.findOneAndRemove({ _id: req.params.user_id });
    res.json({ msg: 'Profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/profiles/experience/:user_id
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience/:user_id',
  [
    auth,
    [
      check('title', 'Job title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const validation = validationResult(req);
    const errors = !validation.isEmpty();
    let errorsArray = validation.array();
    if (req.body.to === '' && req.body.current === false) {
      errorsArray.push({
        msg: 'End date is required if this is your current job',
      });
    }
    if (errors) {
      return res.status(400).json({ errors: errorsArray });
    }

    const checkStatus = await compareUsers(req.user.id, req.params.user_id);
    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.params.user_id });
      profile.experience.unshift(newExperience);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/profiles/experience/:user_id/:exp_id
// @desc    Delete experience from user profile
// @access  Private
router.delete('/experience/:user_id/:exp_id', auth, async (req, res) => {
  const checkStatus = await compareUsers(req.user.id, req.params.user_id);
  if (checkStatus == 401 || checkStatus == 500)
    return res
      .status(checkStatus)
      .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', [
      'firstName',
      'lastName',
      'preferredName',
      'email',
      'username',
      'avatar',
    ]);

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (removeIndex == -1) {
      return res.status(400).json({ msg: 'Experience not found' });
    }

    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/profiles/education/:user_id
// @desc    Add profile education
// @access  Private
router.put(
  '/education/:user_id',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const validation = validationResult(req);
    const errors = !validation.isEmpty();
    let errorsArray = validation.array();
    if (req.body.to === '' && req.body.current === false) {
      errorsArray.push({
        msg: 'End date is required if this is your current school',
      });
    }
    if (errors) {
      return res.status(400).json({ errors: errorsArray });
    }

    const checkStatus = await compareUsers(req.user.id, req.params.user_id);
    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    const { school, degree, fieldOfStudy, from, to, current, description } =
      req.body;

    const newEducation = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.params.user_id });
      profile.education.unshift(newEducation);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/profiles/education/:user_id/:edu_id
// @desc    Delete education from user profile
// @access  Private
router.delete('/education/:user_id/:edu_id', auth, async (req, res) => {
  const checkStatus = await compareUsers(req.user.id, req.params.user_id);
  if (checkStatus == 401 || checkStatus == 500)
    return res
      .status(checkStatus)
      .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', [
      'firstName',
      'lastName',
      'preferredName',
      'email',
      'username',
      'avatar',
    ]);

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    if (removeIndex == -1) {
      return res.status(400).json({ msg: 'Education not found' });
    }

    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profiles/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'nodejs' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
