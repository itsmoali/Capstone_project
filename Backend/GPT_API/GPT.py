import os
import openai
import json

from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPEN_AI_API_KEY")


# json_file = "Backend\\GPT_API\\base_model.json"
json_file = "GPT_API\\base_model.json"

with open(json_file) as f:
    data= json.load(f)




def create_schedule(duration, topic, difficulty):
    

    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo-1106",
        response_format = {"type": "json_object"},
        messages = [
            {"role": "system", "content":"You are a helpful assistant that helps people create courses on various topics. The courses should provide a structure of the topics that the user would learn. The output should strictly be in JSON. If the output isnot in JSON, the system will not accept it."},
            {"role":"user", "content":"Create me a 14 day course outline on Chess. I am a Beginner so structure it accordingly."},
            {"role": "system", "content":"Here is your course outline: " + str(data["courses"][0])},
            {"role": "user", "content":"Create me a 20 day course on Python. I am a Intermediate so structure it accordingly."},
            {"role": "system", "content":"Here is your course outline: " + str(data['courses'][1])},
            {"role":"user", "content":"Create me a 30 day course on Cooking. I am a Beginner so structure it accordingly."},
            {"role": "system", "content":"Here is your course outline: " + str(data['courses'][2])},
            {"role": "user", "content":"Create me a 10 day course on Financial Planning for Business Experts. I am an Expert in Business so structure it accordingly."},
            {"role": "system", "content":"Here is your course outline: " + str(data['courses'][3])},
            {"role": "user", "content":"Create me a "  + duration + "day course on " + topic + ". I am a " + difficulty + " so be sure to construct it according to my proficiency." }
        ],
        max_tokens = 700,
        temperature = 0.2,
        # stream = True,
    )
    if response.choices[0].finish_reason == 'stop':
         
         response = response.choices[0].message.content

         return json.loads(response)

    
    elif response.choices[0].finish_reason == 'length':
        return response.choices[0].message.content


# # detailed_json_file = "GPT_API\\detailed_model.json"
# detailed_json_file = "Backend\\GPT_API\\detailed_model.json"
# with open(json_file) as f:
#     detailed_data= json.load(f)

# def create_course(schedule):

#     response = openai.ChatCompletion.create(
#     model = "gpt-4-1106-preview",
#     response_format = {"type": "json_object"},
#     messages = [
#         {"role": "system", "content":"You are a helpful assistant that helps on Creating Extremly detailed courses, provided the schedule. The output should be extremly detailed and should be strictly in JSON."},
#         {"role":"user", "content":"Using the following Schedule, create me an Extremly Detailed Course:" + str(data["courses"][0])},
#         {"role": "system", "content":"Here is your detailed Course: " + str(detailed_data)},
#         {"role": "user", "content":"Using the following Schedule, create me an Extremly Detailed Course:" + str(schedule)},
#     ],
#     max_tokens = 700,
#     temperature = 0.2,
#     # stream = True,
#     )
#     if response.choices[0].finish_reason == 'stop':
         
#          response = response.choices[0].message.content

#          return json.loads(response)

    
#     elif response.choices[0].finish_reason == 'length':
#         return response.choices[0].message.content
