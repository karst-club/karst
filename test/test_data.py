"""
Tests for page yaml conformation
"""
import anytree
import unittest
from flask_api.util import build_page_data

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


# TODO Assert that certain attributes belong on certain elements
  # levels, xp, knacks and such
