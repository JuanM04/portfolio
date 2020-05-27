import os
import json
from og.og_generator import generate_all as generate_og


if __name__ == "__main__":
    os.chdir(os.path.realpath(__file__ + "/../.."))
    generate_og()
