import os
import math
import frontmatter
from PIL import Image, ImageDraw, ImageFont

og_path = os.path.realpath(__file__ + "/..")
final_path = "public/images/.og"


def text_wrap(text, font, max_width):
    lines = []

    # If the text width is smaller than the image width, then no need to split
    # just add it to the line list and return
    if font.getsize(text)[0] <= max_width:
        lines.append(text)
    else:
        # split the line by spaces to get words
        words = text.split(" ")
        i = 0
        # append every word to a line while its width is shorter than the image width
        while i < len(words):
            line = ""
            while i < len(words) and font.getsize(line + words[i])[0] <= max_width:
                line = line + words[i] + " "
                i += 1
            if not line:
                line = words[i]
                i += 1
            lines.append(line[:-1])
    return "\n".join(lines)


def generate_og_with_icon(title, icon_slug, output):
    image = Image.open(f"{og_path}/background.png")
    draw = ImageDraw.Draw(image)

    icon_size = 148
    icon = Image.open(f"public/images/icons/{icon_slug}-192.png").convert("RGBA")
    icon = icon.resize((icon_size, icon_size), Image.ANTIALIAS)

    font = ImageFont.truetype(f"{og_path}/font.ttf", size=90)
    title = text_wrap(title, font, 1000)

    title_w, title_h = draw.textsize(title, font=font)
    draw.multiline_text(
        ((1200 - title_w) / 2, (630 - title_h + icon_size) / 2),
        title,
        fill="rgb(0, 0, 0)",
        font=font,
        align="center",
        spacing=-10,
    )
    image.paste(
        icon,
        (
            math.floor((1200 - icon_size) / 2),
            math.floor((630 - icon_size - title_h) / 2 + 20),
        ),
        icon,
    )

    image = image.quantize(colors=32, method=2)
    image.save(output)


def generate_all(tools):
    if not os.path.exists(final_path):
        os.mkdir(final_path)
    for tool in tools:
        generate_og_with_icon(
            tool["name"], tool["slug"], f"{final_path}/{tool['slug']}.png"
        )

    if not os.path.exists(final_path + "/docs"):
        os.mkdir(final_path + "/docs")
    docs = os.listdir(f"docs")
    for doc in docs:
        slug = doc.rsplit(".", 1)[0]
        doc_data = frontmatter.load(f"docs/{slug}.md")
        generate_og_with_icon(
            doc_data["title"], "docs", f"{final_path}/docs/{slug}.png"
        )
