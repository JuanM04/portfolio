import os
import frontmatter
from PIL import Image, ImageDraw, ImageFont

og_path = os.path.realpath(__file__ + "/..")


def generate(slug):
    doc = frontmatter.load(f"docs/{slug}.md")
    title = doc["title"]

    image = Image.open(f"{og_path}/background.png")

    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(f"{og_path}/font.ttf", size=90)

    title_w, title_h = draw.textsize(title, font=font)
    while title_w > 1000:
        title = "\n".join(title.rsplit(" ", 1))
        title_w, title_h = draw.textsize(title, font=font)

    draw.multiline_text(
        ((1200 - title_w) / 2, (630 - title_h) / 2),
        title,
        fill="rgb(0, 0, 0)",
        font=font,
        align="center",
        spacing=-10,
    )

    image.save(f"public/images/docs/{slug}.png")


def generate_all():
    docs = os.listdir(f"docs")
    if not os.path.exists("public/images/docs"):
        os.mkdir("public/images/docs")
    for doc in docs:
        generate(doc.rsplit(".", 1)[0])
