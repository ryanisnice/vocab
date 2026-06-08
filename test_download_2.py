import urllib.request

url = "https://raw.githubusercontent.com/ciwga/Oxford3000_Vocab/main/oxford3000_vocabulary_with_collocations_and_definitions_datasets.csv"
try:
    print("Fetching first 2000 bytes from ciwga CSV...")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        chunk = response.read(2000)
        text = chunk.decode('utf-8', errors='ignore')
        print("RAW CSV CHUNK:\n", text)
except Exception as e:
    print("Error:", e)
