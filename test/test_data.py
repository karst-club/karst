"""
Tests for page yaml conformation
"""
import anytree
import emoji
import os
import unittest
from api.util import build_page_data

class TestData(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # If keys are not unique this will throw an error
        cls.page_data = build_page_data()

    def test_all_pages_in_tree(self):
        tree_pages = [node.id for node in anytree.search.findall(self.page_data['tree'])]
        all_pages = list(self.page_data['pages'].keys())
        self.assertCountEqual(
            tree_pages, all_pages, "Not all pages are represented in the page tree.")

    def test_sanity(self):
        # print(anytree.RenderTree(self.page_data['tree']))
        self.assertEqual(2+2, 4)

    def test_required_page_metadata(self):
        required_keys = [
            'title',
            'icon',
            'image',
            'content',
        ]
        for page_name, page_info in self.page_data['pages'].items():
            for k in required_keys:
                self.assertIsNotNone(page_info.get(k),
                    "page {} missing required key {}".format(page_name, k))

    def test_media_references_resolve(self):
        media_folder = 'static/media'
        media = [f for f in os.listdir(media_folder)]
        media_keys = [
            'image',
        ]
        for page_name, page_info in self.page_data['pages'].items():
            for media_key in media_keys:
                if page_info.get(media_key):
                    self.assertIn(
                        page_info[media_key], media,
                        "Reference '{}: {}' in page {} does not resolve to a media file".format(
                            media_key, page_info[media_key], page_name))

    def test_icon_is_emoji(self):
        for page_name, page_info in self.page_data['pages'].items():
            self.assertIn(page_info['icon'], emoji.UNICODE_EMOJI,
                "Page {} has invalid icon: {}".format(page_name, page_info['icon']))

    def test_static_md_has_yml(self):
        for path, _, files in os.walk('static/page_data'):
            for file in files:
                filename, ext = os.path.splitext(file)
                if ext == '.md':
                    self.assertTrue(os.path.exists(
                        os.path.join(path, "{}.yml".format(filename))),
                    "Found markdown page {} without corresponding yaml page data.".format(
                        file))
