const Article = require('../models/Article');
const LearningMaterial = require('../models/LearningMaterial');
const compareUsers = require('../middleware/compareUsers');

async function addComment(req, res, resourceType) {
  let objectModelName = null;
  try {
    const user = await User.findById(req.user.id).select('-password');
    const resourceInfo = await setObjectsType(req.params, resourceType);
    objectModelName = resourceInfo['objectModelName'];
    const object = resourceInfo['object'];

    const newComment = {
      body: req.body.body,
      avatar: user.avatar,
      username: user.username,
      user: req.user.id,
    };
    object.comments.unshift(newComment);

    await object.save();

    res.json(object.comments);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: `${objectModelName} not found` });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

async function deleteComment(req, res, resourceType) {
  let objectModelName = null;
  try {
    const resourceInfo = await setObjectsType(req.params, resourceType);
    objectModelName = resourceInfo['objectModelName'];
    const object = resourceInfo['object'];
    if (!object) {
      return res.status(404).json({ msg: `${objectModelName} not found` });
    }

    // Pull out comment
    const comment = object.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    const checkStatus = await compareUsers(
      req.user.id,
      comment.user.toString(),
      'mentor'
    );

    if (checkStatus == 401 || checkStatus == 500)
      return res
        .status(checkStatus)
        .json({ msg: checkStatus == 401 ? 'Unauthorized' : 'Server Error' });

    const removeIndex = object.comments
      .map((comment) => comment.id.toString())
      .indexOf(req.params.comment_id);

    object.comments.splice(removeIndex, 1);
    await object.save();

    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: `${objectModelName} not found` });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

async function setObjectsType(params, resourceType) {
  let objectModelName,
    object = null;
  if (resourceType === 'article') {
    objectModelName = 'Article';
    object = await Article.findById(params.article_id);
  }
  if (resourceType === 'learning material') {
    objectModelName = 'Learning material';
    object = await LearningMaterial.findById(params.learning_material_id);
  }
  return { objectModelName, object };
}

module.exports = {
  addComment,
  deleteComment,
};
