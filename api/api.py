from flask import Blueprint
from anytree.exporter import DictExporter

api = Blueprint("api", __name__)


@api.route("/api/page_data")
def fetch_page_data():
    from .util import build_page_data

    all_page_data = build_page_data()
    exporter = DictExporter()
    return {
        "pages": all_page_data["pages"],
        "tree": exporter.export(all_page_data["tree"]),
        "knacks": all_page_data["knacks"],
    }
