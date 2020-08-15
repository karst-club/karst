import logging
import markdown
import os
import yaml

from flask import Blueprint, request

logger = logging.getLogger(__name__)
api = Blueprint("api", __name__)

APP_DIR = os.path.split(__file__)[0]

@api.route("/api/page_data")
def fetch_page_data():
    all_pages = {}

    for page_file in os.listdir(os.path.join(APP_DIR, 'pages')):
        page_key = os.path.splitext(page_file)[0]
        page_data = yaml.safe_load(open(os.path.join(APP_DIR, 'pages', page_file), 'r'))
        all_pages[page_key] = page_data

    for page_key in all_pages.keys():
        all_pages[page_key]['html'] = markdown.markdown(
            all_pages[page_key]['content'],
            extensions=['extra', 'smarty'],
            output_format='html5',
        )
        all_pages[page_key]['subpages'] = sorted([
            {
                'title': v['title'],
                'icon': v['icon'],
                'key': k,
                'ordinal_position': v['ordinal_position'],
            }
            for k, v in all_pages.items()
            if v.get('parent_page') == page_key
        ], key=lambda x: x['ordinal_position'])

    return {'pages': all_pages}
