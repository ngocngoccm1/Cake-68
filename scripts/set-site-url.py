"""Set real canonical and Open Graph URLs after choosing a hosting URL."""
from pathlib import Path
from urllib.parse import urlsplit, urljoin
import html
import re
import sys

if len(sys.argv) != 2:
    raise SystemExit('Usage: python scripts/set-site-url.py https://USERNAME.github.io/REPOSITORY/')
url = sys.argv[1].rstrip('/') + '/'
parsed = urlsplit(url)
if parsed.scheme not in ('http', 'https') or not parsed.netloc or parsed.query or parsed.fragment:
    raise SystemExit('Please enter an absolute website URL without query parameters or a fragment.')
page = Path(__file__).resolve().parents[1] / 'index.html'
source = page.read_text(encoding='utf-8')
source = re.sub(r'\s*<link rel="canonical"[^>]*>', '', source)
source = re.sub(r'\s*<meta property="og:url"[^>]*>', '', source)
source = re.sub(r'<meta property="og:image"[^>]*>', '<meta property="og:image" content="' + html.escape(urljoin(url, 'assets/images/hero.jpg'), quote=True) + '">', source)
source = source.replace('  <meta property="og:type"', '  <link rel="canonical" href="' + html.escape(url, quote=True) + '">\n  <meta property="og:url" content="' + html.escape(url, quote=True) + '">\n  <meta property="og:type"', 1)
page.write_text(source, encoding='utf-8')
print('Canonical and Open Graph URLs updated:', url)
