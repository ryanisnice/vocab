import urllib.request
import urllib.parse
import json
import random
import re
import os

# Configuration
SOURCE_URL = "https://raw.githubusercontent.com/winterdl/oxford-5000-vocabulary-audio-definition/master/data/oxford_3000.json"
OUTPUT_FILE = "words.js"
WORDS_PER_PLAN = 300

# Parts of speech mapping
POS_MAPPING = {
    "noun": "n.",
    "verb": "v.",
    "adjective": "adj.",
    "adverb": "adv.",
    "preposition": "prep.",
    "conjunction": "conj.",
    "pronoun": "pron.",
    "exclamation": "excl."
}

# Keywords to classify a word as "workplace"
WORKPLACE_KEYWORDS = [
    r"\bwork\b", r"\boffice\b", r"\bcompany\b", r"\bbusiness\b", r"\bproject\b", 
    r"\bjob\b", r"\bmanage", r"\bclient\b", r"\bsystem\b", r"\bfinance\b", 
    r"\bexecutive\b", r"\bmarketing\b", r"\bproduct\b", r"\bindustry\b", 
    r"\bsell\b", r"\bemployee\b", r"\bstaff\b", r"\bboard\b", r"\bprofit\b", 
    r"\bcost\b", r"\bmarket\b", r"\bstrategy\b", r"\bmeeting\b", r"\bcoordinate\b", 
    r"\ballocate\b", r"\bbudget\b", r"\bcompliance\b", r"\bcontract\b", r"\bcareer\b",
    r"\bemploy\b", r"\bhire\b", r"\bprofession", r"\btrade\b", r"\bsale\b"
]

def download_data():
    print(f"Downloading source data from {SOURCE_URL}...")
    req = urllib.request.Request(SOURCE_URL, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))

def clean_examples(word, raw_examples_str):
    # Examples are often comma or semicolon separated. Clean and extract full sentences.
    parts = [p.strip() for p in re.split(r'[;.]', raw_examples_str) if p.strip()]
    cleaned = []
    for p in parts:
        # Avoid short phrases and definitions repeating the word too trivially
        words_count = len(p.split())
        if words_count >= 4 and not p.lower().startswith(word.lower() + " "):
            # Capitalize first letter, ensure ends with period
            sentence = p[0].upper() + p[1:]
            if not sentence.endswith(('.', '?', '!')):
                sentence += '.'
            cleaned.append(sentence)
            
    # Fallback to whatever phrase we have if no long sentences found
    if not cleaned and raw_examples_str:
        fallback = raw_examples_str.strip()
        if not fallback.endswith(('.', '?', '!')):
            fallback += '.'
        cleaned.append(fallback)
        
    return cleaned[:2] # Max 2 examples

def classify_category(word, definition, examples):
    text_corpus = f"{word} {definition} " + " ".join(examples)
    text_corpus = text_corpus.lower()
    
    # Check if any keyword matches
    for kw in WORKPLACE_KEYWORDS:
        if re.search(kw, text_corpus):
            return "workplace"
    return "conversation"

def translate_single(text, target_lang='zh-TW'):
    try:
        params = urllib.parse.urlencode({
            "client": "gtx",
            "sl": "en",
            "tl": target_lang,
            "dt": "t",
            "q": text
        })
        url = "https://translate.googleapis.com/translate_a/single?" + params
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        trans = ""
        for segment in data[0]:
            if segment[0]:
                trans += segment[0]
        return trans.strip()
    except Exception as e:
        print(f"Single translation error: {e}")
        return text

def translate_batch(texts, target_lang='zh-TW'):
    if not texts:
        return []
        
    # Join with newlines
    query = "\n".join(texts)
    try:
        params = urllib.parse.urlencode({
            "client": "gtx",
            "sl": "en",
            "tl": target_lang,
            "dt": "t",
            "q": query
        })
        url = "https://translate.googleapis.com/translate_a/single?" + params
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            
        translated_text = ""
        for segment in data[0]:
            if segment[0]:
                translated_text += segment[0]
                
        # Split back by newline
        translated_lines = [line.strip() for line in translated_text.split('\n')]
        
        # Google Translate occasionally merges blank lines or collapses lines.
        # Fallback to single translation if mismatch occurs.
        if len(translated_lines) != len(texts):
            print(f"Warning: Batch size mismatch ({len(translated_lines)} vs {len(texts)}). Retrying individually...")
            return [translate_single(t, target_lang) for t in texts]
            
        return translated_lines
    except Exception as e:
        print(f"Batch translation error: {e}. Retrying individually...")
        return [translate_single(t, target_lang) for t in texts]

def main():
    try:
        raw_data = download_data()
    except Exception as e:
        print(f"Failed to download data: {e}")
        return

    # 1. Parse and clean all items
    all_words = []
    print("Preprocessing and cleaning data...")
    for idx, item in raw_data.items():
        word = item.get("word", "").strip().lower()
        # Filter out multi-word phrases, short words, or invalid entries
        if not word or len(word) < 3 or " " in word:
            continue
            
        definition = item.get("definition", "").strip()
        raw_example = item.get("example", "").strip()
        
        if not definition or not raw_example:
            continue
            
        # Clean examples
        cleaned_examples = clean_examples(word, raw_example)
        if not cleaned_examples:
            continue
            
        # Map part of speech
        raw_pos = item.get("type", "").strip().lower()
        pos = POS_MAPPING.get(raw_pos, "n.") # Default to noun if unrecognized
        
        # Phonetic transcription
        phonetic = item.get("phon_n_am", "").strip()
        if not phonetic:
            phonetic = item.get("phon_br", "").strip()
        if not phonetic:
            phonetic = f"/{word}/"
            
        # Category classification
        category = classify_category(word, definition, cleaned_examples)
        
        cefr = item.get("cefr", "a1").strip().lower()
        
        all_words.append({
            "word": word,
            "pos": pos,
            "phonetic": phonetic,
            "definition": definition,
            "category": category,
            "cefr": cefr,
            "raw_examples": cleaned_examples
        })

    print(f"Found {len(all_words)} usable words.")

    # 2. Distribute into Short, Medium, Long-term plans based on CEFR levels
    # Short: A1, A2
    # Medium: B1
    # Long: B2, C1
    pools = {
        "short": [w for w in all_words if w["cefr"] in ["a1", "a2"]],
        "medium": [w for w in all_words if w["cefr"] == "b1"],
        "long": [w for w in all_words if w["cefr"] in ["b2", "c1", "c2"]]
    }

    # Ensure we shuffle and take exactly 300 words for each plan
    selected_words = []
    for plan, pool in pools.items():
        print(f"Plan '{plan}' pool size: {len(pool)} words.")
        if len(pool) < WORDS_PER_PLAN:
            print(f"Warning: Not enough words in pool '{plan}'. Filling up from other pools...")
            # Fallback: Merge all pools and take random ones
            pool.extend(random.sample(all_words, WORDS_PER_PLAN - len(pool)))
        
        # Shuffle pool
        random.shuffle(pool)
        
        # Select first 300 unique words
        plan_selection = []
        seen = set()
        for w in pool:
            if w["word"] not in seen:
                seen.add(w["word"])
                w["plan"] = plan
                plan_selection.append(w)
            if len(plan_selection) == WORDS_PER_PLAN:
                break
        
        selected_words.extend(plan_selection)

    print(f"Selected total of {len(selected_words)} words (300 per plan).")

    # 3. Translate all words and example sentences in batches to Traditional Chinese (zh-TW)
    # Gather words to translate
    words_to_translate = [w["word"] for w in selected_words]
    print(f"Translating {len(words_to_translate)} words...")
    translated_words = []
    
    # Batch size of 50
    batch_size = 50
    for i in range(0, len(words_to_translate), batch_size):
        batch = words_to_translate[i:i+batch_size]
        print(f"Translating words batch {i//batch_size + 1}/{((len(words_to_translate)-1)//batch_size)+1}...")
        translated_words.extend(translate_batch(batch))
        
    # Associate word translations back
    for idx, w in enumerate(selected_words):
        w["translation"] = translated_words[idx]

    # Gather all example sentences to translate
    examples_to_translate = []
    for w in selected_words:
        for ex_en in w["raw_examples"]:
            examples_to_translate.append(ex_en)
            
    print(f"Translating {len(examples_to_translate)} example sentences...")
    translated_examples = []
    for i in range(0, len(examples_to_translate), batch_size):
        batch = examples_to_translate[i:i+batch_size]
        print(f"Translating examples batch {i//batch_size + 1}/{((len(examples_to_translate)-1)//batch_size)+1}...")
        translated_examples.extend(translate_batch(batch))

    # Associate example translations back
    ex_idx = 0
    final_database = []
    for w in selected_words:
        examples_list = []
        for ex_en in w["raw_examples"]:
            examples_list.append({
                "en": ex_en,
                "zh": translated_examples[ex_idx]
            })
            ex_idx += 1
            
        final_database.append({
            "word": w["word"],
            "pos": w["pos"],
            "phonetic": w["phonetic"],
            "translation": w["translation"],
            "definition": w["definition"],
            "category": w["category"],
            "plan": w["plan"],
            "examples": examples_list
        })

    # 4. Write to words.js
    print(f"Writing final database to {OUTPUT_FILE}...")
    
    # Convert data to JS string structure
    js_content = "const VOCAB_DATABASE = "
    js_content += json.dumps(final_database, ensure_ascii=False, indent=2)
    js_content += ";\n\n"
    js_content += "if (typeof module !== 'undefined' && module.exports) {\n"
    js_content += "  module.exports = VOCAB_DATABASE;\n"
    js_content += "}\n"
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Database generation complete! Output written to {OUTPUT_FILE}.")

if __name__ == "__main__":
    main()
