#!/user/bin/env python3
import click

from app import create_app, db
from app.models import card, card_list, deck, pile
# from tests import test_app

app = create_app()


# flask cli context setup
@app.shell_context_processor
def get_context():
    """Objects exposed here will be automatically available from the shell."""
    return dict(app=app, db=db, card=card, card_list=card_list, deck=deck, pile=pile)


@app.cli.command()
def create_db():
    """Create the configured database."""
    db.create_all()


@app.cli.command()
@click.confirmation_option(prompt='Drop all database tables?')
def drop_db():
    """Drop the current database."""
    db.drop_all()


if __name__ == '__main__':
    app.run()
