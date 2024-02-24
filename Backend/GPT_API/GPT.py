import os
from openai import OpenAI
import json

from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

# json_files = "GPT_API\Training_files" // Use for local development
json_files = "Backend\GPT_API\Training_files" #Use for production
# List of Courses
#[Intermediate Physics, Advanced Chemistry,Advanced Biology,Beginner Finance Fundamentals,
# Intermediate Sales Strategies,Advanced Sales Concepts,Advanced Sociology,Intermediate Debating Techniques]
# base_model = os.path.join(json_files, "New_Basic_Schedule.json")

base_model = r"GPT_API/Training_files/New_Basic_Schedule.json"
with open(base_model) as f:
    Base_data= json.load(f)



# detailed_model = os.path.join(json_files, "New_Detailed_Schedule.json")
detailed_model = r"GPT_API/Training_files/New_Detailed_Schedule.json"

with open(detailed_model) as f:
    Detailed_data= json.load(f)






# Create a Basic Course Outline
def course_outline(duration, topic, difficulty):
    

    response = client.chat.completions.create(
        model = "gpt-3.5-turbo-1106",
        response_format = {"type": "json_object"},
        messages = [
            {"role": "system", "content":"You are a helpful assistant that helps people create courses on various topics. The courses should provide a structure of the topics that the user would learn. The output should strictly be in JSON. If the output isnot in JSON, the system will not accept it."},
            {"role":"user", "content":"Create me a 10 day course outline on Physics. The difficulty level should be Intermediate."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data["Courses"][0])},
            {"role": "user", "content":"Create me a 15 day course on Chemisty. The difficulty level should be Advance."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][1])},
            {"role":"user", "content":"Create me a 10 day course on Biology. The difficulty level should be Advance."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][2])},
            {"role": "user", "content":"Create me a 7 day course on Finance. The difficulty level should be Beginner."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][3])},
            {"role": "user", "content":"Create me a 7 day course on Sales. The difficulty level should be Intermediate."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][4])},
            {"role": "user", "content":"Create me a 7 day course on Sales. The difficulty level should be Advance."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][5])},
            {"role": "user", "content":"Create me a 10 day course on Sociology. The difficulty level should be Advance."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][6])},
            {"role": "user", "content":"Create me a 5 day course on Debating Techniques. The difficulty level should be Intermediate."},
            {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][7])},
            {"role": "user", "content":"Create me a "  + duration + "day course on " + topic + ". The difficulty level should be " + difficulty  }
        ],
        max_tokens = 1000,
        temperature = 0.2,
        # stream = True,
    )
    if response.choices[0].finish_reason == 'stop':
         
         response = response.choices[0].message.content

         return json.loads(response)

    
    elif response.choices[0].finish_reason == 'length':
        return response.choices[0].message.content



# Create a Detailed Course using the Course Outline
    

def create_detailed_schedule(schedule):
    output = schedule
    
    # Initialize subtopics_details dictionary
    

    for index, topic in enumerate(schedule['schedule']):
        subtopics_details = {subtopic: [] for subtopic in topic['subtopics']}
        for subtopic in topic['subtopics']:
            acceptable_result = False

            while not acceptable_result:
        
                response = client.chat.completions.create(
                        model="gpt-3.5-turbo-1106",
                        response_format={"type": "json_object"},
                         messages=[
                        {"role": "system", "content": """ You are a helpful teaching assistant that helps create a detailed and verbose description
                         for a list of topics. The description for each topic should be more than 200 words. The Output should always follow the following schema:
                         
                         '''
                         Topics (The topic provided by the user) : {
                            Description: "A detailed and verbose description of the topic"
                         }

                         '''
                        
                        The output should strictly be in JSON and should follow the example schema. If the output is not in JSON and doesn't follow the schema, the system will not accept it.
                        

                        """},
                        {"role": "user", "content": "Give me as much detail as possible on the following topics: "+  str(Base_data["Courses"][6]["schedule"][0]["subtopics"])},
                        {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][0]["subtopics"])},
                        {"role": "user", "content": "Give me as much detail as possible on the following topics: "+  str(Base_data["Courses"][6]["schedule"][1]["subtopics"])},
                        {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][1]["subtopics"])},
                        {"role": "user", "content": "Give me as much detail as possible on the following topics: " + str(Base_data["Courses"][0]["schedule"][0]["subtopics"])},
                        {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][0]["subtopics"])},
                        {"role": "user", "content": "Give me as much detail as possible on the following topics: " + str(Base_data["Courses"][0]["schedule"][1]["subtopics"])},
                        {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][1]["subtopics"])},
                        {"role": "user", "content": "Give me as much detail as possible on the following topic: " + str(subtopic)}
                    ],
                        max_tokens=1000,
                        temperature=0.3,
                        # stream=True,
                    )
                
                
                if response.choices[0].finish_reason == 'stop':
                    try:
                        response = json.loads(response.choices[0].message.content)
                        
                        subtopics_details[subtopic].append(response)
                        acceptable_result = True
                        
                    except KeyError as e:
                        print(f"KeyError: {e}")
                        
                        
                    except json.JSONDecodeError as e:
                        print(f"JSONDecodeError: {e}")
                        
        topic['subtopics'] = subtopics_details

    print(output)
        
    return output













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

