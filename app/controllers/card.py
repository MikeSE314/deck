from flask import Blueprint, jsonify, request

from ..models.card import Card
from ..models.card_list import CardList
from ..models.deck import Deck
from ..models.pile import Pile

card_api_blueprint = Blueprint('card_api', __name__)


@card_api_blueprint.route('/', methods=["GET"])
def read_all():
    cards = Card.query.all()
    return jsonify([card.serial for card in cards])


@card_api_blueprint.route('/<id>', methods=["GET"])
def read_one(id):
    card = Card.query.get(id)
    if not card:
        return f"No card {id}", 404
    return jsonify(card.serial)


@card_api_blueprint.route('/', methods=["POST"])
def create():
    card = Card(name=request.json['name'], description=request.json['description'], image=request.json['image'])
    card.save()
    return jsonify(card.serial)


@card_api_blueprint.route('/<id>', methods=["PUT"])
def update(id):
    card = Card.query.get(id)
    if not card:
        return f"No card {id}", 404
    card.update(request.json)
    card.save()
    return jsonify(card.serial)


@card_api_blueprint.route('/<id>', methods=["DELETE"])
def delete(id):
    card = Card.query.get(id)
    if not card:
        return f"No card {id}", 404
    card.delete()
    return "Deleted"
