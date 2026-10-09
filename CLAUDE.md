# Pracownia Improwizacji (strona dla studentów)

Statyczna strona po polsku: HTML + CSS + zwykły JS, bez budowania. Publikowana
z gałęzi `main` przez GitHub Pages: https://sanefungus.github.io/impro/

## Struktura
- `index.html` – szkielet i opisy sekcji.
- `assets/app.js` – cała logika (jeden IIFE), `assets/style.css` – style.
- `dane/*.js` – treści jako `DANE.*` (sylabus, ćwiczenia, gry, kategorie, biblioteka).
  Listy miejsc i relacji generatora: `DANE.generator` w `dane/kategorie.js`.

## Wersjonowanie plików (obowiązkowe)
GitHub Pages każe przeglądarkom trzymać CSS/JS przez 10 minut, więc po
publikacji studenci widzieli starą wersję. Dlatego wszystkie lokalne pliki w
`index.html` mają numer wersji: `assets/app.js?v=1`.

**Przed każdym pushem, który zmienia `assets/` lub `dane/`, podbij wersję:**

```
python bump-wersji.py            # podgląd (nic nie zapisuje)
python bump-wersji.py --zapisz   # zapis
```

Skrypt podbija `?v=N` jednakowo przy wszystkich plikach. Nowy plik CSS/JS
dopisany do `index.html` też dostaje `?v=N` (bieżący numer).

## Zasady pracy
- Pliki z polskimi znakami edytuj z jawnym UTF-8 (`io.open(..., encoding='utf-8', newline='')`).
- Po zmianie JS: `node --check assets/app.js`.
- Podgląd wymaga serwera HTTP (np. `python -m http.server`); z `file://` nie działa.
- Nie commituj ani nie pushuj bez wyraźnej prośby. Treści po redakcji
  autora; własne teksty Claude’a oznacz do przejrzenia.
- Nowy tekst dla studentów: prosty język, bez żargonu.
