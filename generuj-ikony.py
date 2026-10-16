"""Generuje PNG-i ikony strony (assets/ikony/) ze zrodel zrodlo-*.html.

Zrodla renderuje Chrome (lub Edge) bez okna, czcionka Bricolage Grotesque
jest pobierana z Google Fonts tak samo jak na stronie (potrzebny internet).

Uzycie:  python generuj-ikony.py          (tabela planowanych plikow, nic nie zapisuje)
         python generuj-ikony.py --zapisz (renderuje i zapisuje)
"""
import io
import os
import subprocess
import sys
import tempfile

from PIL import Image

KATALOG = os.path.join("assets", "ikony")
PRZEGLADARKI = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]
# (plik wyjsciowy, zrodlo, rozmiar)
PLIKI = [
    ("ikona-512.png", "zrodlo-any.html", 512),
    ("ikona-192.png", "zrodlo-any.html", 192),
    ("ikona-maskable-512.png", "zrodlo-maskable.html", 512),
    ("apple-touch-icon.png", "zrodlo-any.html", 180),
    ("favicon-32.png", "zrodlo-any.html", 32),
]

przegladarka = next((p for p in PRZEGLADARKI if os.path.exists(p)), None)
if not przegladarka:
    sys.exit("Nie znaleziono Chrome ani Edge.")

print("%-26s %-22s %s" % ("plik", "zrodlo", "rozmiar"))
for wyj, zrodlo, rozm in PLIKI:
    print("%-26s %-22s %dx%d" % (os.path.join(KATALOG, wyj), zrodlo, rozm, rozm))
print("Przegladarka: " + przegladarka)

if "--zapisz" not in sys.argv:
    sys.exit("Dry-run. Dodaj --zapisz, aby wygenerowac.")

wzorce = {}  # zrodlo -> obraz 512x512
with tempfile.TemporaryDirectory() as tmp:
    for zrodlo in sorted({z for _, z, _ in PLIKI}):
        adres = "file:///" + os.path.abspath(os.path.join(KATALOG, zrodlo)).replace("\\", "/")
        cel = os.path.join(tmp, zrodlo + ".png")
        subprocess.run([
            przegladarka, "--headless=new", "--disable-gpu", "--hide-scrollbars",
            "--window-size=512,512", "--virtual-time-budget=10000",
            "--screenshot=" + cel, adres,
        ], check=True, capture_output=True)
        wzorce[zrodlo] = Image.open(cel).convert("RGB").crop((0, 0, 512, 512))

for wyj, zrodlo, rozm in PLIKI:
    obraz = wzorce[zrodlo]
    if rozm != 512:
        obraz = obraz.resize((rozm, rozm), Image.LANCZOS)
    obraz.save(os.path.join(KATALOG, wyj), optimize=True)
    print("Zapisano " + os.path.join(KATALOG, wyj))
