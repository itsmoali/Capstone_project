from pprint import pprint
from datetime import datetime, timedelta
from Google import create_service
course_data = {
    "course": "HTML Basics for Beginners",
    "difficulty": "Beginner",
    "duration": "10 days",
    "schedule": [
        {
            "day": 1,
            "topic": "Introduction to HTML",
            "subtopics": [
                "What is HTML?",
                "Basic structure of an HTML document",
                "Creating your first HTML file"
            ]
        },
        {
            "day": 2,
            "topic": "HTML Elements and Tags",
            "subtopics": [
                "Understanding HTML elements",
                "Commonly used HTML tags",
                "Semantic HTML"
            ]
        },
        {
            "day": 3,
            "topic": "Text Formatting and Links",
            "subtopics": [
                "Formatting text with HTML",
                "Creating hyperlinks",
                "Linking to internal and external pages"
            ]
        },
        {
            "day": 4,
            "topic": "Images and Multimedia",
            "subtopics": [
                "Adding images to web pages",
                "Embedding videos and audio",
                "Accessibility considerations"
            ]
        },
        {
            "day": 5,
            "topic": "Lists and Tables",
            "subtopics": [
                "Creating ordered and unordered lists",
                "Designing tables in HTML",
                "Table accessibility"
            ]
        },
        {
            "day": 6,
            "topic": "Forms and Input Elements",
            "subtopics": [
                "Building web forms",
                "Input types and attributes",
                "Form validation"
            ]
        },
        {
            "day": 7,
            "topic": "Mid-Term Review and Quiz",
            "subtopics": [
                "Recap of key concepts",
                "Quiz on learned material",
                "Feedback session"
            ]
        },
        {
            "day": 8,
            "topic": "HTML5 Semantic Elements",
            "subtopics": [
                "Understanding semantic HTML5 elements",
                "Benefits of semantic markup",
                "Implementing semantic elements"
            ]
        },
        {
            "day": 9,
            "topic": "CSS Basics",
            "subtopics": [
                "Introduction to CSS",
                "Linking CSS to HTML",
                "Basic styling and layout"
            ]
        },
        {
            "day": 10,
            "topic": "Responsive Design and Best Practices",
            "subtopics": [
                "Creating responsive web pages",
                "Best practices for HTML and CSS",
                "Course conclusion and Q&A session"
            ]
        }
    ]
}


CLIENT_SECRET_FILE = 'credentials.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

service = create_service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

def hour_calc(start, hours):
    original_time = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S.%fZ")
    new_time = original_time + timedelta(hours=hours)
    new_time = new_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    return new_time

def date_calc(start):
    original_time = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S.%fZ")
    new_time = original_time + timedelta(days = 1)
    new_time = new_time.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    return new_time
    

def event_creator(course_data, start_date, daily_practice_time, user_time_zone = 'America/Los_Angeles'):
    
    schedule = course_data['schedule']
    start_time = start_date
    user_time_zone = service.calendarList().get(calendarId='primary').execute()['timeZone']

    total_events = []

    for i in range(len(schedule)):
        
        current_event = {
        "summary":  course_data['course'] +'\n' "Day: " + str(schedule[i]['day'])+ ' ' + schedule[i]['topic'],
        "description": '\n'.join(schedule[i]['subtopics']),
        "start" : {
            'dateTime': start_time,
            'timeZone' : user_time_zone,
        },
        "end" : {
            'dateTime': hour_calc(start_time, daily_practice_time),
            'timeZone' : user_time_zone,
        }
    }
        
        total_events.append(current_event)
        start_time = date_calc(start_time)
    

    for i in total_events:
        response = service.events().insert(calendarId='primary', body=i).execute()
        print(response)

