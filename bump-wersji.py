"""Podbija numer wersji (?v=N) przy lokalnych plikach CSS/JS w index.html.

Uzycie:  python bump-wersji.py          (pokazuje zmiany, nic nie zapisuje)
         python bump-wersji.py --zapisz (zapisuje)
"""
import io
import re
import sys

PLIK = "index.html"
WZOR = re.compile(r'((?:href|src)="(?:assets|dane)/[a-z]+\.(?:css|js))\?v=(\d+)"')

with io.open(PLIK, encoding="utf-8", newline="") as f:
    tekst = f.read()

wersje = {int(m.group(2)) for m in WZOR.finditer(tekst)}
if not wersje:
    sys.exit("Nie znaleziono plikow z ?v=N w " + PLIK)
nowa = max(wersje) + 1
wynik = WZOR.sub(lambda m: '%s?v=%d"' % (m.group(1), nowa), tekst)

print("Wersja: %d -> %d (plikow: %d)" % (max(wersje), nowa, len(WZOR.findall(tekst))))
if "--zapisz" in sys.argv:
    with io.open(PLIK, "w", encoding="utf-8", newline="") as f:
        f.write(wynik)
    print("Zapisano.")
else:
    print("Dry-run. Dodaj --zapisz, aby zapisac.")
