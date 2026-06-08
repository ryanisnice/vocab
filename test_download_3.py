import urllib.request

url = "https://raw.githubusercontent.com/ciwga/Oxford3000_Vocab/main/oxford3000_vocabulary_with_collocations_and_definitions_datasets.csv"
try:
    print("Downloading 10KB from ciwga CSV and saving locally...")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    with urllib.request.urlopen(req) as response:
        chunk = response.read(10000)
        with open("test_output.csv", "wb") as f:
            f.write(chunk)
    print("Saved successfully to test_output.csv")
except Exception as e:
    print("Error:", e)
