import urllib.request
import json

url = "https://raw.githubusercontent.com/winterdl/oxford-5000-vocabulary-audio-definition/master/data/oxford_3000.json"
try:
    print("Fetching first 2000 bytes...")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        chunk = response.read(5000)
        text = chunk.decode('utf-8')
        print("RAW CHUNK:\n", text[:2000])
except Exception as e:
    print("Error:", e)
