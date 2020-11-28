import os

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from werkzeug.exceptions import HTTPException

# instantiate extensions
login_manager = LoginManager()
db = SQLAlchemy()


def create_app(environment='development'):

    from config import config
    from .controllers.index import main_blueprint
    from .auth.views import auth_blueprint
    from .auth.models import User, AnonymousUser

    from .controllers.card import card_api_blueprint
    from .controllers.pile import pile_api_blueprint
    from .controllers.deck import deck_api_blueprint

    # Instantiate app.
    app = Flask(__name__)

    # Set app config.
    env = os.environ.get('FLASK_ENV', environment)
    app.config.from_object(config[env])
    config[env].configure(app)

    # Set up extensions.
    db.init_app(app)
    login_manager.init_app(app)

    # Register blueprints.
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(main_blueprint)

    app.register_blueprint(card_api_blueprint, url_prefix="/api/v1/card")
    app.register_blueprint(pile_api_blueprint, url_prefix="/api/v1/pile")
    app.register_blueprint(deck_api_blueprint, url_prefix="/api/v1/deck")

    # Set up flask login.
    @login_manager.user_loader
    def get_user(id):
        return User.query.get(int(id))

    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'
    login_manager.anonymous_user = AnonymousUser

    # Error handlers.
    @app.errorhandler(HTTPException)
    def handle_http_error(exc):
        return render_template('error.html', error=exc), exc.code

    return app
