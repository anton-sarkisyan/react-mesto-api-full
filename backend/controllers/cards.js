const Card = require('../models/card');
const NotFoundErr = require('../errors/not-found-err');
const ValidationErr = require('../errors/validation-err');
const NoRightsErr = require('../errors/no-rights-err');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationErorr') {
        next(new ValidationErr('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new NotFoundErr('Карточка по указанному _id не найдена'))
    .then((card) => {
      if (String(card.owner) !== req.user._id) {
        throw new NoRightsErr('Недостаточно прав для совершения действия');
      }
      Card.findByIdAndRemove(cardId)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.message === 'Карточка по указанному _id не найдена') {
        next(err);
      } else if (err.message === 'Недостаточно прав для совершения действия') {
        next(err);
      } else if (err.name === 'CastError' || 'ValidationErorr') {
        next(new ValidationErr('Передан некорретный id карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundErr('Карточка по указанному _id не найдена'))
    .then((card) => res.send(card)
      .catch((err) => {
        if (err.message === 'Карточка по указанному _id не найдена') {
          next(err);
        } else if (err.name === 'CastError' || 'ValidationErorr') {
          next(new ValidationErr('Переданы некорректные данные для постановки лайка'));
        } else {
          next(err);
        }
      }));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new NotFoundErr('Карточка по указанному _id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'Карточка по указанному _id не найдена') {
        next(err);
      } else if (err.name === 'CastError' || 'ValidationErorr') {
        next(new ValidationErr('Переданы некорректные данные для удаления лайка'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
