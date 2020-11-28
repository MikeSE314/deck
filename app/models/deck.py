from ..auth.models import User, AnonymousUser
from .. import db
from ..utils import ModelMixin

class Deck(db.Model, ModelMixin):

    __tablename__ = "Deck"

    id = db.Column(db.Integer, primary_key=True)
    piles = db.Column(db.JSON, nullable=False)

    @property
    def serial(self):
        return {"id": self.id, "piles": self.piles}

    def update(self, json):
        if 'piles' in json:
            self.piles = json['piles']
        return self


"""

Deck
id (can have many decks)
piles (starts with draw, discard, whatever)

CardList (defines which cards go where)
id (can have many types of decks)
name (e.g. 52, pinochle, root)
cards (The raw data)

Pile
id (can have many piles)
name (e.g. draw, discard, player 1 hand, player 1 table)
:card_list_id (can have a certain order)

Card
id (can have many cards)
name (e.g. KH, TS, 5C; Birdy Bindle, Hideous Laughter)
description (e.g. King of Hearts; Play this card to . . .)
image (i.e. http://example.com/myimage.png)


"""
