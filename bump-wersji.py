"""Podbija numer wersji (?v=N) przy lokalnych plikach CSS/JS we wszystkich
stronach .html w katalogu glownym (index.html, przewodniki).

Uzycie:  python bump-wersji.py          (pokazuje zmiany, nic nie zapisuje)
         python bump-wersji.py --zapisz (zapisuje)
"""
import glob
import io
import re
import sys

WZOR = re.compile(r'((?:href|src)="(?:assets|dane)/[a-z]+\.(?:css|js))\?v=(\d+)"')

teksty = {}
for plik in sorted(glob.glob("*.html")):
    with io.open(plik, encoding="utf-8", newline="") as f:
        teksty[plik] = f.read()

wersje = {int(m.group(2)) for t in teksty.values() for m in WZOR.finditer(t)}
if not wersje:
    sys.exit("Nie znaleziono plikow z ?v=N w stronach .html")
nowa = max(wersje) + 1

print("Wersja: %d -> %d" % (max(wersje), nowa))
for plik, tekst in teksty.items():
    n = len(WZOR.findall(tekst))
    if not n:
        continue
    print("  %-50s plikow: %d" % (plik, n))
    if "--zapisz" in sys.argv:
        with io.open(plik, "w", encoding="utf-8", newline="") as f:
            f.write(WZOR.sub(lambda m: '%s?v=%d"' % (m.group(1), nowa), tekst))

print("Zapisano." if "--zapisz" in sys.argv else "Dry-run. Dodaj --zapisz, aby zapisac.")
