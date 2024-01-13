import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
from openai import OpenAI
import instructor
from pydantic import Field, BaseModel
from typing import List

client = instructor.patch(OpenAI())


class CleanedChunk(BaseModel):
    """
    This is a class which represents a cleaned chunk of text that
    is from the original essay. Make sure to not add or delete any words,
    only perform formatting.

    Here is an example for reference.

    this       is badLy\n\n\n\nformatteD\ntext

    should be converted to

    this is badly formatted text
    """

    text: str = Field(
        ...,
        description="This is a field which should store the cleaned text",
    )


class CleanedEssay(BaseModel):
    cleaned_text: List[CleanedChunk]


urls = ["https://www.paulgraham.com/ds.html"]

for url in urls:
    data = requests.get(url)
    body = data.text
    soup = BeautifulSoup(body, features="html.parser")
    paragraph = soup.find("p")
    paragraph = (
        str(paragraph)
        .replace("<br/>", "\n")
        .replace("<br><", "")
        .replace("\n", "\n", 1)
    )
    parsed_paragraph = paragraph
    parsed_md = md(parsed_paragraph)

    cleaned_essay: CleanedEssay = client.chat.completions.create(
        model="gpt-3.5-turbo-16k",
        temperature=0,
        response_model=CleanedEssay,
        messages=[
            {
                "role": "system",
                "content": "You are a world class algorithm that excels at \
                    cleaning and sanitizing data. You are about to be passed \
                    a essay to clean. You will be removing awkward spacing, \
                    newlines , formatting, links and html tags.",
            },
            {
                "role": "assistant",
                "content": "Make sure to not edit the content, no words should be added or removed.",
            },
            {"role": "user", "content": parsed_md},
        ],
        max_retries=2,
    )

    print(cleaned_essay)

    with open("./generated.md", "w") as f:
        f.write("\n".join([i.text for i in cleaned_essay.cleaned_text]))
