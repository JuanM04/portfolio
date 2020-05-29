import os
import frontmatter
from PIL import Image, ImageDraw, ImageFont

og_path = os.path.realpath(__file__ + "/..")
final_path = "public/images/.og"


def generate_doc(slug):
    doc = frontmatter.load(f"docs/{slug}.md")
    title = doc["title"]

    image = Image.open(f"{og_path}/doc_background.png")

    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(f"{og_path}/doc_font.ttf", size=90)

    title_w, title_h = draw.textsize(title, font=font)
    while title_w > 800:
        title = "\n".join(title.rsplit(" ", 1))
        title_w, title_h = draw.textsize(title, font=font)

    draw.multiline_text(
        ((1200 - title_w) / 2, (630 - title_h) / 2 + 20),
        title,
        fill="rgb(0, 0, 0)",
        font=font,
        align="center",
        spacing=-10,
    )

    image.save(f"{final_path}/docs/{slug}.png")


def generate_all():
    if not os.path.exists(final_path):
        os.mkdir(final_path)
        os.mkdir(final_path + "/docs")

    docs = os.listdir(f"docs")
    for doc in docs:
        generate_doc(doc.rsplit(".", 1)[0])
