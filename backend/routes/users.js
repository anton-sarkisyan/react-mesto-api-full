const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getCurrentUser, handleLogOut
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.delete('/logout', handleLogOut);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/[www]?[\S]+$/).required(),
  }),
}), updateAvatar);

module.exports = router;
