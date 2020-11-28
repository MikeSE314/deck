from flask import Blueprint, jsonify, request

from ..models.card import Card
from ..models.card_list import CardList
from ..models.deck import Deck
from ..models.pile import Pile

card_list_api_blueprint = Blueprint('card_list_api', __name__)


@card_list_api_blueprint.route('/', methods=["GET"])
def read_all():
    card_lists = CardList.query.all()
    return jsonify([card_list.serial for card_list in card_lists])


@card_list_api_blueprint.route('/<id>', methods=["GET"])
def read_one(id):
    card_list = CardList.query.get(id)
    if not card_list:
        return f"No card_list {id}", 404
    return jsonify(card_list.serial)


@card_list_api_blueprint.route('/<id>/cards', methods=["GET"])
def read_from(id):
    card_list = CardList.query.get(id)
    if not card_list:
        return f"No card_list {id}", 404
    cards = Card.query.filter(Card.id.in_(card_list.cards)).all()
    return jsonify([card.serial for card in cards])


@card_list_api_blueprint.route('/', methods=["POST"])
def create():
    if 'name' in request.json:
        card_list = CardList(name=request.json['name'], cards=request.json['cards'])
    else:
        card_list = CardList(cards=request.json['cards'])
    card_list.save()
    return jsonify(card_list.serial)


@card_list_api_blueprint.route('/<id>', methods=["PUT"])
def update(id):
    card_list = CardList.query.get(id)
    if not card_list:
        return f"No card_list {id}", 404
    card_list.update(request.json)
    card_list.save()
    return jsonify(card_list.serial)


@card_list_api_blueprint.route('/<id>', methods=["DELETE"])
def delete(id):
    card_list = CardList.query.get(id)
    if not card_list:
        return f"No card_list {id}", 404
    card_list.delete()
    return "Deleted"
