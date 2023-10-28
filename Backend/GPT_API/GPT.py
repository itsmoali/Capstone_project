import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

this = "Create a detailed course, along with sufficient resources, to learn Chess in 30 days.The course should be divided into weekly sections, which should be further subdivided into daily sections. Each section should contain various reading and video resources that would help the user get a bteer grasp on the core concepts. All the resources should be clickable web-links leadings to correct and viable webpages. It is extremly important that there are clickable links.",

# response = openai.Completion.create(
#   model="gpt-3.5-turbo-instruct",
#   prompt= this,
#   max_tokens=500,
#   temperature=0
# )

# print(response.choices[0].text.strip())

this = """Create a detailed 30 day long course, along with sufficient resources, for a given topic. 
The course should be divided into weekly sections, which should be further subdivided into daily sections. Each section should contain 
various reading and video resources that would help the user get a better grasp on the core concepts. 
All the resources should be clickable web links leading to correct and viable web pages.
It is extremely important that there are clickable links. 
The output should be in the form of a json object that can be easily parsed using python, with the following structure:"""


ans = """{
    "Course Name": "30-Day Chess Mastery",
    "Duration": "30 days",
    "Description": "This course is designed to help you become a chess master, covering the fundamentals to advanced strategies.",
    "Syllabus": {
        "Week 1": {
            "Day 1": {
                "Topic": "Introduction to Chess",
                "Resources": [
                    {
                        "Title": "Chess Basics",
                        "Description": "Learn the rules, setup, and basic concepts of chess.",
                        "Link": "URL"
                    },
                    {
                        "Title": "Video: How to Set Up the Chessboard",
                        "Description": "Watch a video tutorial on setting up the chessboard.",
                        "Link": "URL"
                    }
                ]
            },
            "Day 2": {
                "Topic": "Chess Notation",
                "Resources": [
                    {
                        "Title": "Chess Notation Explained",
                        "Description": "Understand algebraic notation and its importance in chess.",
                        "Link": "URL"
                    },
                    {
                        "Title": "Video: Understanding Chess Notation",
                        "Description": "Watch a video on how to read and write chess notation.",
                        "Link": "URL"
                    }
                ]
            },
            "Day 3": {
                "Topic": "Opening Principles",
                "Resources": [
                    {
                        "Title": "Chess Openings for Beginners",
                        "Description": "Learn about the basic principles of chess openings.",
                        "Link": "URL"
                    },
                    {
                        "Title": "Video: Principles of Chess Openings",
                        "Description": "Watch a video explaining opening principles and strategies.",
                        "Link": "URL"
                    }
                ]
            }
        }}},
"""

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": this},
    {"role": "user", "content": ans},
    {'role': 'user', 'content': 'Create a course on Dota 2.'}
  ],
    max_tokens=300,
)

print(completion.choices[0])