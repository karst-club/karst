import logging
import os

from flask import Flask

logging.basicConfig(level=os.environ.get("LOGLEVEL", "INFO"))
logger = logging.getLogger(__name__)


def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    from .api import api
    app.register_blueprint(api)

    return app
