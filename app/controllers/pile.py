from flask import Blueprint, jsonify, request

from ..models.card import Card
from ..models.card_list import CardList
from ..models.deck import Deck
from ..models.pile import Pile

pile_api_blueprint = Blueprint('pile_api', __name__)


@pile_api_blueprint.route('/', methods=["GET"])
def read_all():
    piles = Pile.query.all()
    return jsonify([pile.serial for pile in piles])


@pile_api_blueprint.route('/<id>', methods=["GET"])
def read_one(id):
    pile = Pile.query.get(id)
    if not pile:
        return f"No pile {id}", 404
    return jsonify(pile.serial)


@pile_api_blueprint.route('/<id>/cards', methods=["GET"])
def read_from(id):
    pile = Pile.query.get(id)
    if not pile:
        return f"No pile {id}", 404
    cards = Card.query.filter(Card.id.in_(pile.cards)).all()
    return jsonify([card.serial for card in cards])


@pile_api_blueprint.route('/', methods=["POST"])
def create():
    if 'name' in request.json:
        pile = Pile(name=request.json['name'], cards=request.json['cards'])
    else:
        pile = Pile(cards=request.json['cards'])
    pile.save()
    return jsonify(pile.serial)


@pile_api_blueprint.route('/<id>', methods=["PUT"])
def update(id):
    pile = Pile.query.get(id)
    if not pile:
        return f"No pile {id}", 404
    pile.update(request.json)
    pile.save()
    return jsonify(pile.serial)


@pile_api_blueprint.route('/<id>', methods=["DELETE"])
def delete(id):
    pile = Pile.query.get(id)
    if not pile:
        return f"No pile {id}", 404
    pile.delete()
    return "Deleted"
