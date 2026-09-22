from pathlib import Path
from urllib.parse import quote
import json, webbrowser
root = Path(__file__).resolve().parent
photos = sorted((root / 'photos').iterdir(), key=lambda p: p.name.lower())
items = [{'src': 'photos/' + quote(p.name), 'alt': p.stem} for p in photos if p.is_file() and p.suffix.lower() in {'.jpg','.jpeg','.png','.webp','.gif','.avif'}]
if not items:
    items = [{'src':'assets/home-reference.png','alt':'Palm reflection','reference':True}]
(root / 'photos.js').write_text('window.PHOTOS = ' + json.dumps(items, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
webbrowser.open((root / 'index.html').as_uri())
