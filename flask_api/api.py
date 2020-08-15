import logging
import markdown
import os
import yaml

from flask import Blueprint, request

logger = logging.getLogger(__name__)
api = Blueprint("api", __name__)

@api.route("/api/list-subpages")
def list_subpages():
    return {"subpages": [
        ('Rules', "👩‍⚖️"),
        ('Character Creation', "👤"),
        ('Species', "🐹"),
        ('Knacks', "🤹‍♂️"),
        ('Magic', "💫"),
        ('Items & Loot', "🏹"),
        ('Setting', "🏕️"),
        ('Places', "⛰️"),
        ('Playing as a Party', "👥"),
    ]}

@api.route("/api/page/<page>")
def fetch_page_data(page):
    app_dir = os.path.split(__file__)[0]
    data = yaml.safe_load(open(
        os.path.join(app_dir, 'pages', "{}.yml".format(page)), 'r'))
    html = markdown.markdown(
        data['content'],
        extensions=['extra', 'smarty'],
        output_format='html5',
    )
    return {
        **data,
        'html': html,
    }
