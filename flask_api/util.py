import logging
import markdown
import os
import pandas as pd
import yaml

from anytree import AnyNode
from jinja2 import Template

logger = logging.getLogger(__name__)

APP_DIR = os.path.split(__file__)[0]


def build_page_tree(all_pages):
    """
    Build a tree structure for the page data
    """
    def assign_children(parent_node, subpages):
        """
        Recursively assign child nodes
        """
        for subpage in subpages:
            node = AnyNode(id=subpage['key'], parent=parent_node)
            assign_children(node, all_pages[subpage['key']]['subpages'])

    root_keys = [k for k, v in all_pages.items() if not v.get('parent_page')]
    assert len(root_keys) == 1, "Page structure tree should only have one root({})".format(
        len(root_keys))
    root_key = root_keys[0]
    root_node = AnyNode(id=root_key)
    assign_children(root_node, all_pages[root_key]['subpages'])

    return root_node


def build_page_data() -> dict:
    page_data_dir = os.path.join(APP_DIR, 'static/page_data')
    all_pages = {}
    for path, _, files in os.walk(page_data_dir):
        for page_file in files:
            page_key, ext = os.path.splitext(page_file)

            if ext == '.yml':
                assert all_pages.get(page_key) is None, "Duplicate page_key {}".format(page_key)

                page_data = yaml.safe_load(open(os.path.join(page_data_dir, path, page_file), 'r'))                
                page_data['key'] = page_key

                all_pages[page_key] = page_data
                markdown_path = os.path.join(page_data_dir, path, "{}.md".format(page_key))
                if os.path.exists(markdown_path):
                    all_pages[page_key]['content'] = open(markdown_path, 'r').read()
                else:
                    all_pages[page_key]['content'] = ''

    for page_key in all_pages.keys():
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

    page_tree = build_page_tree(all_pages)

    return {'pages': all_pages, 'tree': page_tree}

def csv_to_html(table_id):
    """
    Looks for tables by name in static/tables, reads CSV and returns HTML
    """
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

