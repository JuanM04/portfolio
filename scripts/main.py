import os
import json
from icons.icons_generator import generate_all_icons
from og.og_generator import generate_all as generate_og


if __name__ == "__main__":
    os.chdir(os.path.realpath(__file__ + "/../.."))

    tools = json.load(open("utils/data/tools.json", "r"))

    generate_all_icons(tools)
    generate_og(tools)
