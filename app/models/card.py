from ..auth.models import User, AnonymousUser
from .. import db
from ..utils import ModelMixin

class Card(db.Model, ModelMixin):

    __tablename__ = "Card"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    image = db.Column(db.Text)

    @property
    def serial(self):
        return {"id": self.id, "name": self.name, "description": self.description, "image": self.image}

    def update(self, json):
        if 'name' in json:
            self.name = json['name']
        if 'description' in json:
            self.description = json['description']
        if 'image' in json:
            self.image = json['image']
        return self

    # def __str__(self):
    #     return 'Card: %s' % self.name

    # def __repr__(self):
    #     return f'<Card: id={self.id}, name={self.name}, description={self.description}, image={self.image}>'


"""
Card
id (can have many cards)
name (e.g. KH, TS, 5C; Birdy Bindle, Hideous Laughter)
description (e.g. King of Hearts; Play this card to . . .)
image (i.e. http://example.com/myimage.png)
"""
