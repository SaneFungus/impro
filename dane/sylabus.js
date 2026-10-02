// Sylabus i zasady. wartosc: null = pole pokaże się jako "do uzupełnienia".
// Uzupełnij na podstawie oficjalnego sylabusa Akademii.
window.DANE = window.DANE || {};

DANE.sylabus = {
  podstawowe: [
    { etykieta: "Przedmiot", wartosc: "Improwizacja aktorska (WA/A/ImprA-Z), grupa 1" },
    { etykieta: "Kierunek i rok", wartosc: "Aktorstwo, II rok" },
    { etykieta: "Rok akademicki", wartosc: "2026/27" },
    { etykieta: "Prowadzący", wartosc: "Oskar Hamerski" },
    { etykieta: "Termin", wartosc: "piątki, 14:30–16:45" },
    { etykieta: "Sala", wartosc: "113/114 Baletowa, budynek główny Akademii Teatralnej, ul. Miodowa 22/24" },
    { etykieta: "Forma zaliczenia", wartosc: "semestr zimowy: zaliczenie; semestr letni: ocena" },
    { etykieta: "Kontakt", wartosc: "grupa na Messengerze albo mail uczelniany" }
  ],
  sekcje: [
    {
      id: "obecnosc",
      tytul: "Obecność",
      punkty: [
        { etykieta: "Dopuszczalna liczba nieobecności nieusprawiedliwionych w semestrze", wartosc: "2" },
        { etykieta: "Jak usprawiedliwić nieobecność", wartosc: "Zwolnienie lekarskie oddajesz bezpośrednio mnie, najpóźniej tydzień po nieobecności. Zwolnienie do produkcji zewnętrznej: tylko za zgodą Pani Dziekan, podstawą jest wiadomość z BOTS (nie zwalniasz się u mnie sam/sama)." },
        { etykieta: "Spóźnienia", wartosc: "Zapisuję je. Spóźnienia z semestru zimowego mogą obniżyć ocenę końcową, którą wystawiam po semestrze letnim." },
        { etykieta: "Co, jeśli przekroczę limit", wartosc: "Trzecia nieobecność nieusprawiedliwiona oznacza niezaliczenie przedmiotu. Jedyna droga to podanie do Pani Dziekan o warunkowe zaliczenie." }
      ],
      kody: [
        { kod: "ob", opis: "obecność" },
        { kod: "sp", opis: "spóźnienie" },
        { kod: "usp", opis: "nieobecność usprawiedliwiona" },
        { kod: "n", opis: "nieobecność nieusprawiedliwiona" }
      ]
    },
    {
      id: "zaliczenie",
      tytul: "Zaliczenie: semestr zimowy",
      punkty: [
        { etykieta: "Warunki zaliczenia", wartosc: "Obecność (maksymalnie 2 nieobecności nieusprawiedliwione) i aktywny udział w zajęciach. Błąd na scenie nie obniża oceny, jest materiałem do pracy." },
        { etykieta: "Pokaz lub forma końcowa", wartosc: "Nie ma osobnych zajęć zaliczeniowych. Liczy się praca przez cały semestr." }
      ]
    },
    {
      id: "ocena",
      tytul: "Ocena: semestr letni",
      punkty: [
        { etykieta: "Kryteria oceny", wartosc: "Praca przez cały rok, nie jeden pokaz: gotowość do działania, słuchanie partnera, podejmowanie ryzyka. Błąd na scenie nie obniża oceny, jest materiałem do pracy. Szczegółowe kryteria podam przed semestrem letnim." },
        { etykieta: "Skala ocen", wartosc: "Obowiązuje skala ocen przyjęta w Akademii. Szczegóły podam przed semestrem letnim." },
        { etykieta: "Wpływ obecności na ocenę", wartosc: "Spóźnienia z semestru zimowego mogą obniżyć ocenę końcową z przedmiotu, wystawianą po semestrze letnim. Obowiązują też zasady obecności z sekcji powyżej." }
      ]
    },
    {
      id: "opisowa",
      tytul: "Ocena opisowa",
      tekst: "Na koniec każdego semestru każda osoba dostaje ode mnie ocenę opisową: co widzę w Twojej pracy, co jest Twoją siłą i w którą stronę warto iść dalej. Powstaje z notatek, które robię przez cały semestr, a nie z pamięci ostatnich zajęć."
    },
    {
      id: "sala",
      tytul: "Zasady sali",
      szkic: true,
      lista: [
        "Błąd na scenie jest materiałem, nie porażką.",
        "Nie oceniamy siebie nawzajem. Mówimy o propozycjach i skutkach.",
        "Strój, w którym można leżeć na podłodze i biegać.",
        "Telefon tylko wtedy, gdy ćwiczenie go wymaga."
      ]
    }
  ]
};
