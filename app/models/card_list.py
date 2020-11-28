from ..auth.models import User, AnonymousUser
from .. import db
from ..utils import ModelMixin

class CardList(db.Model, ModelMixin):

    __tablename__ = "CardList"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    cards = db.Column(db.JSON, nullable=False)

    @property
    def serial(self):
        return {"id": self.id, "name": self.name, "cards": self.cards}

    def update(self, json):
        if 'name' in json:
            self.name = json['name']
        if 'cards' in json:
            self.cards = json['cards']
        return self


"""

Deck
id           :integer: (can have many decks)
card_lists        :JSON:    (starts with draw, discard, whatever)

CardList (defines which cards go where)
id           :integer: (can have many types of decks)
name         :string:  (e.g. 52, pinochle, root; )
cards        :JSON:    (The raw data)

Card
id           :integer: (can have many cards)
name         :string:  (e.g. KH, TS, 5C; Birdy Bindle, Hideous Laughter)
description  :string:  (e.g. King of Hearts; Play this card to . . .)
image        :string:  (i.e. http://example.com/myimage.png)


"""
