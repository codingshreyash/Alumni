import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

headers = {
    'Authorization': f'Bearer {os.getenv('LOGOS_SECRET_KEY')}'
}

url = "https://api.logo.dev/search?q=twitter"

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)