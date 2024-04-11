import os
from openai import OpenAI
import urllib.request
import json
import concurrent.futures
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

# json_files = "GPT_API\Training_files" // Use for local development
json_files = "Backend\GPT_API\Training_files" #Use for production
# List of Courses
#[Intermediate Physics, Advanced Chemistry,Advanced Biology,Beginner Finance Fundamentals,
# Intermediate Sales Strategies,Advanced Sales Concepts,Advanced Sociology,Intermediate Debating Techniques]
# base_model = os.path.join(json_files, "New_Basic_Schedule.json")
save_path = "Backend/GPT_API/images/"

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
            {"role": "system", "content":"You are a helpful assistant that helps people create courses on various topics."
             "The courses should provide a structure of the topics that the user would learn, along with a summary of what they will learn. The output should strictly be in JSON."
             "If the output is not in JSON, the system will not accept it. The output should always use the following schema"
            """
                - course: String
                - difficulty: String
                - duration: String
                - summary: String
                - skills : Array of Strings
                - schedule: Array
                  - day: Integer
                  - topic: String
                  - subtopics: Array of Strings
                  """
            "The following rules should always be followed:"
             '''
            "1- Generate the Schedule for any duration specified by user"
            "2- Always include a detailed summary of 200 words for the course"
            "3- Always strictly abide by the output schema"
            "4- Generate the Schedule for any difficulty level specified by the user"
            "5- Generate the Schedule for any topic specified by the user"},
            '''},
            
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
        max_tokens = 2000,
        temperature = 0.1,
        # stream = True,
    )
    if response.choices[0].finish_reason == 'stop':
         
         response = response.choices[0].message.content

         return json.loads(response)

    
    elif response.choices[0].finish_reason == 'length':
        return response.choices[0].message.content



def create_detailed_schedule(schedule, day):
    # output = chunked_lst
    
    # Initialize subtopics_details dictionary
    

    chunked_lst = schedule['schedule'][day]['subtopics']
    subtopics_details = {subtopic: [] for subtopic in chunked_lst}
    for subtopic in chunked_lst:
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
                    max_tokens=2000,
                    temperature=0.1,
                    # stream=True,
                )
            
            
            if response.choices[0].finish_reason == 'stop':
                try:
                    response = json.loads(response.choices[0].message.content)
                    key = list(response.keys())[0]
                    
                    
                    subtopics_details[subtopic].append(response[key])
                    acceptable_result = True
                    
                except KeyError as e:
                    print(f"KeyError: {e}")
                    
                    
                except json.JSONDecodeError as e:
                    print(f"JSONDecodeError: {e}")
                        
        

    schedule['schedule'][day]['subtopics'] = subtopics_details
        
    return subtopics_details 





    
def threading(schedule):
    num_tasks = len(schedule['schedule'])

    with ThreadPoolExecutor(max_workers=1) as executor:
        futures = [executor.submit(create_detailed_schedule,schedule,day=i) for i in range(num_tasks)]
        concurrent.futures.wait(futures)
    return schedule


def img_gen(prompt):
    response = client.images.generate(
      model="dall-e-3",
      prompt="Create me a thumbnail image for a course on " + prompt ,
      size="1024x1024",
      quality="standard",
      n=1,
    )
    img_url =  response.data[0].url
    # img, _ = urllib.request.urlretrieve(img_url, save_path + prompt + ".png")
    return img_url



# Create a Basic Course Outline
# def course_outline(duration, topic, difficulty):
    

#     response = client.chat.completions.create(
#         model = "gpt-3.5-turbo-1106",
#         response_format = {"type": "json_object"},
#         messages = [
#             {"role": "system", "content":"You are a helpful assistant that helps people create courses on various topics. The courses should provide a structure of the topics that the user would learn. The output should strictly be in JSON. If the output isnot in JSON, the system will not accept it."},
#             {"role":"user", "content":"Create me a 10 day course outline on Physics. The difficulty level should be Intermediate."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data["Courses"][0])},
#             {"role": "user", "content":"Create me a 15 day course on Chemisty. The difficulty level should be Advance."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][1])},
#             {"role":"user", "content":"Create me a 10 day course on Biology. The difficulty level should be Advance."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][2])},
#             {"role": "user", "content":"Create me a 7 day course on Finance. The difficulty level should be Beginner."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][3])},
#             {"role": "user", "content":"Create me a 7 day course on Sales. The difficulty level should be Intermediate."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][4])},
#             {"role": "user", "content":"Create me a 7 day course on Sales. The difficulty level should be Advance."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][5])},
#             {"role": "user", "content":"Create me a 10 day course on Sociology. The difficulty level should be Advance."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][6])},
#             {"role": "user", "content":"Create me a 5 day course on Debating Techniques. The difficulty level should be Intermediate."},
#             {"role": "system", "content":"Here is your course outline: " + str(Base_data['Courses'][7])},
#             {"role": "user", "content":"Create me a "  + duration + "day course on " + topic + ". The difficulty level should be " + difficulty  }
#         ],
#         max_tokens = 1000,
#         temperature = 0.2,
#         # stream = True,
#     )
#     if response.choices[0].finish_reason == 'stop':
         
#          response = response.choices[0].message.content

#          return json.loads(response)

    
#     elif response.choices[0].finish_reason == 'length':
#         return response.choices[0].message.content



# Create a Detailed Course using the Course Outline
    

# def create_detailed_schedule(schedule):
#     output = schedule
    
#     # Initialize subtopics_details dictionary
    

#     for index, topic in enumerate(schedule['schedule']):
#         subtopics_details = {subtopic: [] for subtopic in topic['subtopics']}
#         for subtopic in topic['subtopics']:
#             acceptable_result = False

#             while not acceptable_result:
        
#                 response = client.chat.completions.create(
#                         model="gpt-3.5-turbo-1106",
#                         response_format={"type": "json_object"},
#                          messages=[
#                         {"role": "system", "content": """ You are a helpful teaching assistant that helps create a detailed and verbose description
#                          for a list of topics. The description for each topic should be more than 200 words. The Output should always follow the following schema:
                         
#                          '''
#                          Topics (The topic provided by the user) : {
#                             Description: "A detailed and verbose description of the topic"
#                          }

#                          '''
                        
#                         The output should strictly be in JSON and should follow the example schema. If the output is not in JSON and doesn't follow the schema, the system will not accept it.
                        

#                         """},
#                         {"role": "user", "content": "Give me as much detail as possible on the following topics: "+  str(Base_data["Courses"][6]["schedule"][0]["subtopics"])},
#                         {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][0]["subtopics"])},
#                         {"role": "user", "content": "Give me as much detail as possible on the following topics: "+  str(Base_data["Courses"][6]["schedule"][1]["subtopics"])},
#                         {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][1]["subtopics"])},
#                         {"role": "user", "content": "Give me as much detail as possible on the following topics: " + str(Base_data["Courses"][0]["schedule"][0]["subtopics"])},
#                         {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][0]["subtopics"])},
#                         {"role": "user", "content": "Give me as much detail as possible on the following topics: " + str(Base_data["Courses"][0]["schedule"][1]["subtopics"])},
#                         {"role": "system", "content": str(Detailed_data["Course_Details"][0]["schedule"][1]["subtopics"])},
#                         {"role": "user", "content": "Give me as much detail as possible on the following topic: " + str(subtopic)}
#                     ],
#                         max_tokens=1000,
#                         temperature=0.3,
#                         # stream=True,
#                     )
                
                
#                 if response.choices[0].finish_reason == 'stop':
#                     try:
#                         response = json.loads(response.choices[0].message.content)
                        
#                         subtopics_details[subtopic].append(response)
#                         acceptable_result = True
                        
#                     except KeyError as e:
#                         print(f"KeyError: {e}")
                        
                        
#                     except json.JSONDecodeError as e:
#                         print(f"JSONDecodeError: {e}")
                        
#         topic['subtopics'] = subtopics_details

#     print(output)
        
#     return output








