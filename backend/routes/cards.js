const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { objValidateCardId } = require('../middlewares/validation');

router.get('/', getAllCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/^https?:\/\/[www]?[\S]+$/).required(),
  }),
}), createCard);
router.delete('/:cardId', celebrate(objValidateCardId), deleteCard);
router.put('/:cardId/likes', celebrate(objValidateCardId), likeCard);
router.delete('/:cardId/likes', celebrate(objValidateCardId), dislikeCard);

module.exports = router;
