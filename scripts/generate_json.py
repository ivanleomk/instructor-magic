import os
import json
from markdown2 import Markdown

folder_path = os.path.join(os.getcwd(), "src/essays")
output_file = os.path.join(folder_path, "essays.json")

essays = {}
markdowner = Markdown()

for filename in os.listdir(folder_path):
    if filename.endswith(".md"):
        file_path = os.path.join(folder_path, filename)
        with open(file_path, "r") as file:
            content = file.read()
            slug = file_path.replace(".md", "").split("/").pop()
            title = " ".join([word.capitalize() for word in slug.split("-")])

            essays[slug] = {
                "title": title,
                "description": "",  # TODO : Add in a GPT generated description here ( 3.5 should be fine ),
                "raw_markdown": content,
                "html": markdowner.convert(content),
            }

with open(output_file, "w") as file:
    json.dump(essays, file)
