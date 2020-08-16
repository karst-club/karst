import logging
import markdown
import os
import pandas as pd
import yaml

from flask import Blueprint, request
from jinja2 import Template

logger = logging.getLogger(__name__)
api = Blueprint("api", __name__)

APP_DIR = os.path.split(__file__)[0]


def csv_to_html(table_id):
    """
    Looks for tables by name in static/tables, reads CSV and returns HTML
    """
    print("processing csv_to_html for table_id {}".format(table_id))
    if not table_id:
        return

    csv_data_dir = os.path.join(APP_DIR, 'static/tables')
    df = pd.read_csv(os.path.join(csv_data_dir, "{}.csv".format(table_id)))
    return df.to_html(index=False)


def process_content(content):
    """
    Given the "content" block of a page YAML, this should
    return HTML that will be rendered in the application.

    Currently converts to markdown to HTML and also embeds
    CSV tables referenced by their filenames in jinja syntax
    (see backgrounds.yml for an example)
    """
    template = Template(content)
    template.globals['embed_table'] = csv_to_html
    rendered = template.render()
    html = markdown.markdown(
        rendered,
        extensions=['extra', 'smarty'],
        output_format='html5',
    )
    return html


@api.route("/api/page_data")
def fetch_page_data():
    all_pages = {}
    page_data_dir = os.path.join(APP_DIR, 'static/page_data')

    for path, _, files in os.walk(page_data_dir):
        for page_file in files:
            page_key = os.path.splitext(page_file)[0]
            page_data = yaml.safe_load(open(os.path.join(page_data_dir, path, page_file), 'r'))
            all_pages[page_key] = page_data

    for page_key in all_pages.keys():
        all_pages[page_key]['key'] = page_key
        print("processing content for page {}".format(page_key))
        all_pages[page_key]['html'] = process_content(
            all_pages[page_key]['content'])
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
