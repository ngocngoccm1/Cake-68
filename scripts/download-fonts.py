"""Download the Google Fonts Latin + Latin Extended webfonts and OFL licenses."""
import re, requests
from pathlib import Path
folder = Path('assets/fonts')
url = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..600;1,400..500&family=DM+Sans:wght@400..600&display=swap'
ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
r = requests.get(url, headers={'User-Agent': ua}, timeout=30)
r.raise_for_status()
blocks = re.findall(r'/\* (latin(?:-ext)?) \*/\s*(@font-face\s*\{[^}]+\})', r.text)
css = '\n\n'.join('/* ' + name + ' */\n' + block for name, block in blocks)
assert blocks and '.woff2' in css
for i, u in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)', css))):
    name = f'font-{i:02d}.woff2'
    data = requests.get(u, timeout=30)
    data.raise_for_status()
    (folder / name).write_bytes(data.content)
    css = css.replace(u, './' + name)
(folder / 'fonts.css').write_text(css)
for old in folder.glob('*.ttf'):
    old.unlink()
for family, filename in [('cormorantgaramond', 'Cormorant-Garamond-OFL.txt'), ('dmsans', 'DM-Sans-OFL.txt')]:
    r = requests.get(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt', timeout=30)
    r.raise_for_status()
    (folder / filename).write_text(r.text)
print('Local WOFF2 fonts and OFL licenses saved.')
