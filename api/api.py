from flask import Blueprint, request
from hashlib import sha1
from anytree.exporter import DictExporter

SECRET_SHA = b'}\\*-a6\xfb\xf1f!\x1dQ\x83\xbff!J$\x7f1'

api = Blueprint("api", __name__)


@api.route("/api/page_data")
def fetch_page_data():
    from .util import build_page_data

    secret = request.cookies.get('secret')
    if secret:
        secret = sha1(secret.encode()).digest() == SECRET_SHA

    all_page_data = build_page_data(secret=secret)
    exporter = DictExporter()
    return {
        "pages": all_page_data["pages"],
        "tree": exporter.export(all_page_data["tree"]),
        "knacks": all_page_data["knacks"],
    }
