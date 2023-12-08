from datetime import datetime, timedelta
import os
from collections import namedtuple
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

def create_service(client_secret_file, api_name, api_version, *scopes, prefix=''):
    CLIENT_SECRET_FILE = client_secret_file
    API_SERVICE_NAME = api_name
    API_VERSION = api_version
    SCOPES = [scope for scope in scopes[0]]
    
    creds = None
    working_dir = os.getcwd()
    token_dir = 'token files'
    token_file = f'token_{API_SERVICE_NAME}_{API_VERSION}{prefix}.json'

    ### Check if token dir exists first, if not, create the folder
    if not os.path.exists(os.path.join(working_dir, token_dir)):
        os.mkdir(os.path.join(working_dir, token_dir))

    if os.path.exists(os.path.join(working_dir, token_dir, token_file)):
        creds = Credentials.from_authorized_user_file(os.path.join(working_dir, token_dir, token_file), SCOPES)
        # with open(os.path.join(working_dir, token_dir, token_file), 'rb') as token:
        #   cred = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
            creds = flow.run_local_server(redirect_uri_trailing_slash=False)

        with open(os.path.join(working_dir, token_dir, token_file), 'w') as token:
            token.write(creds.to_json())

    try:
        service = build(API_SERVICE_NAME, API_VERSION, credentials=creds, static_discovery=False)
        print(API_SERVICE_NAME, API_VERSION, 'service created successfully')
        return service
    except Exception as e:
        print(e)
        print(f'Failed to create service instance for {API_SERVICE_NAME}')
        os.remove(os.path.join(working_dir, token_dir, token_file))
        return None



CLIENT_SECRET_FILE = 'credentials.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = ['https://www.googleapis.com/auth/calendar']

service = create_service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

def hour_calc(start, hours):
    original_time = datetime.strptime(start, '%Y-%m-%dT%H:%M:%S%z')
    new_time = original_time + timedelta(hours=hours)
    new_time = new_time.strftime('%Y-%m-%dT%H:%M:%S%z')
    return new_time

def date_calc(start):
    original_time = datetime.strptime(start, '%Y-%m-%dT%H:%M:%S%z')
    new_time = original_time + timedelta(days = 1)
    new_time = new_time.strftime('%Y-%m-%dT%H:%M:%S%z')
    return new_time

def combine_date_time(date,time):

    date = datetime.fromisoformat(date)
    hours, minutes = map(int, time.split(':'))

    time_delta = timedelta(hours=hours, minutes=minutes)
    combined = date + time_delta

    formatted = combined.isoformat()

    return formatted
    

    

def event_creator(course_data, start_date, start_time, daily_practice_time, user_time_zone = 'America/Los_Angeles'):
    
    schedule = course_data['schedule']
    start_time = combine_date_time(start_date, start_time)
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
