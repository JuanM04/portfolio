import os
from PIL import Image
from cairosvg import svg2png

icons_path = os.path.realpath(__file__ + "/..")
final_path = "public/images/icons"


def optimize(path):
    img = Image.open(path)
    img = img.quantize(colors=16, method=2)
    img.save(path)
    pass


def generate_icon():
    obj = open(f"{icons_path}/icon.svg", "rb")

    for size in (32, 128, 152, 167, 180, 192, 512, 1024):
        path = f"{final_path}/Icon-{size}.png"
        svg2png(file_obj=obj, write_to=path, output_width=size, output_height=size)
        optimize(path)


def generate_tool_icon(id):
    obj = open(f"{icons_path}/tools/{id}.svg", "rb")

    for size in (48, 192, 512):
        path = f"{final_path}/{id}-{size}.png"
        svg2png(file_obj=obj, write_to=path, output_width=size, output_height=size)
        optimize(path)


def generate_all_icons(tools):
    if not os.path.exists(final_path):
        os.mkdir(final_path)

    generate_icon()
    for id in list(map(lambda t: t["slug"], tools)):
        generate_tool_icon(id)
