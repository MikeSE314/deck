from flask import Blueprint, jsonify, request

from ..models.card import Card
from ..models.card_list import CardList
from ..models.deck import Deck
from ..models.pile import Pile

deck_api_blueprint = Blueprint('deck_api', __name__)


@deck_api_blueprint.route('/', methods=["GET"])
def read_all():
    decks = Deck.query.all()
    return jsonify([deck.serial for deck in decks])


@deck_api_blueprint.route('/<id>', methods=["GET"])
def read_one(id):
    deck = Deck.query.get(id)
    if not deck:
        return f"No deck {id}", 404
    return jsonify(deck.serial)


@deck_api_blueprint.route('/<id>/piles/', methods=["GET"])
def read_piles_from(id):
    deck = Deck.query.get(id)
    if not deck:
        return f"No deck {id}", 404
    piles = Pile.query.filter(Pile.id.in_(deck.piles)).all()
    return jsonify([pile.serial for pile in piles])


@deck_api_blueprint.route('/<id>/cards/', methods=["GET"])
def read_cards_from(id):
    deck = Deck.query.get(id)
    if not deck:
        return f"No deck {id}", 404
    piles = Pile.query.filter(Pile.id.in_(deck.piles)).all()
    cards = []
    for pile in piles:
        cards.extend(Card.query.filter(Card.id.in_(pile.cards)).all())
    return jsonify([card.serial for card in cards])


@deck_api_blueprint.route('/', methods=["POST"])
def create():
    deck = Deck(piles=request.json['piles'])
    deck.save()
    return jsonify(deck.serial)


@deck_api_blueprint.route('/<id>', methods=["PUT"])
def update(id):
    deck = CardList.query.get(id)
    if not deck:
        return f"No deck {id}", 404
    deck.update(request.json)
    deck.save()
    return jsonify(deck.serial)


@deck_api_blueprint.route('/<id>', methods=["DELETE"])
def delete(id):
    deck = CardList.query.get(id)
    if not deck:
        return f"No deck {id}", 404
    deck.delete()
    return "Deleted"
