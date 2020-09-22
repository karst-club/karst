import os
import yaml

from flask import Blueprint, request
from hashlib import sha1
from anytree.exporter import DictExporter

SECRET_SHA = b"}\\*-a6\xfb\xf1f!\x1dQ\x83\xbff!J$\x7f1"

api = Blueprint("api", __name__)

PROJECT_DIR = os.path.split(os.path.split(__file__)[0])[0]

try:
    CONFIG = yaml.safe_load(open(os.path.join(PROJECT_DIR, "config.yml")))
except:
    print("NEEED good formatted and existing config.yamyamyaml or I will die before living")


@api.route("/api/page_data")
def fetch_page_data():
    from .util import build_page_data

    secret = request.cookies.get("secret")
    secret_access = False
    if secret:
        secret_access = sha1(secret.encode()).digest() == SECRET_SHA

    all_page_data = build_page_data(CONFIG["content"], secret_access=secret_access)
    exporter = DictExporter()
    return {
        "pages": all_page_data["pages"],
        "tree": exporter.export(all_page_data["tree"]),
        "knacks": all_page_data["knacks"],
    }
