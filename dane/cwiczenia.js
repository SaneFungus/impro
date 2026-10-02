// Ćwiczenia publiczne. przyklad: true = przykład do podmiany na ćwiczenia z Twojego banku.
// Tagi pochodzą z listy DANE.tagi poniżej.
window.DANE = window.DANE || {};

DANE.tagi = ["rozgrzewka", "para", "grupa", "słuchanie", "akceptacja", "status", "emocje", "ruch", "historia", "postać"];

DANE.cwiczenia = [
  {
    nazwa: "Tak, i…", tagi: ["para", "akceptacja", "słuchanie"], czas: "10 min", osoby: "pary", przyklad: true,
    przebieg: "Para planuje wspólne przedsięwzięcie, na przykład wyprawę albo przyjęcie. Każda kwestia zaczyna się od «Tak, i…» i przyjmuje to, co powiedział partner, dokładając jedną nową rzecz.",
    cel: "Akceptacja propozycji i budowanie na cudzym pomyśle.",
    wariacje: "Najpierw dwie minuty w wersji «Tak, ale…», potem «Tak, i…». Porównajcie, co się zmieniło w energii.",
    zrodlo: "klasyka improwizacji"
  },
  {
    nazwa: "Lustro", tagi: ["para", "słuchanie", "ruch", "rozgrzewka"], czas: "10 min", osoby: "pary", przyklad: true,
    przebieg: "Jedna osoba prowadzi ruch, druga jest jej odbiciem. Na sygnał zmiana ról. Na końcu nikt nie prowadzi: ruch ma się dziać sam.",
    cel: "Uwaga skupiona na partnerze, wspólny rytm.",
    wariacje: "Lustro w różnych tempach. Lustro z dźwiękiem.",
    zrodlo: "Viola Spolin"
  },
  {
    nazwa: "Opowieść słowo po słowie", tagi: ["para", "grupa", "historia", "słuchanie"], czas: "10 min", osoby: "pary albo krąg", przyklad: true,
    przebieg: "Tworzymy historię, dokładając po jednym słowie. Nikt nie wie, dokąd ona zmierza.",
    cel: "Rezygnacja z kontroli nad historią. Skutki prowadzą przebieg.",
    wariacje: "Zdanie po zdaniu. Para jako jeden ekspert, który odpowiada na pytania słowo po słowie.",
    zrodlo: "Keith Johnstone"
  },
  {
    nazwa: "Huśtawka statusu", tagi: ["para", "status"], czas: "15 min", osoby: "pary", przyklad: true,
    przebieg: "Prosta scena, na przykład spotkanie na przystanku. Osoba A przez całą scenę podnosi swój status, osoba B swój obniża. Potem zamiana.",
    cel: "Doświadczenie statusu jako działania, a nie cechy.",
    wariacje: "A i B walczą o wysoki status. A i B ścigają się, kto zagra niżej.",
    zrodlo: "Keith Johnstone"
  },
  {
    nazwa: "Pan i sługa", tagi: ["para", "status", "postać"], czas: "15 min", osoby: "pary albo trójki", przyklad: true,
    przebieg: "Sługa obsługuje pana i podtrzymuje jego wysoki status. Pan może karać za każde potknięcie.",
    cel: "Para statusowa, praca z przestrzenią i przedmiotami.",
    wariacje: "Dwóch panów i jeden sługa. Sługa, który po cichu przejmuje władzę.",
    zrodlo: "Keith Johnstone"
  },
  {
    nazwa: "Prezent", tagi: ["para", "akceptacja", "rozgrzewka"], czas: "5 min", osoby: "pary", przyklad: true,
    przebieg: "A daje B niewidzialny prezent. B go rozpakowuje, nazywa i cieszy się nim. A reaguje na to, co B znalazł, jakby to był dokładnie ten prezent.",
    cel: "Przyjmowanie propozycji i dawanie partnerowi sukcesu.",
    wariacje: "A nazywa prezent, a B musi go pokochać.",
    zrodlo: "klasyka improwizacji"
  },
  {
    nazwa: "Drabina emocji", tagi: ["emocje", "para"], czas: "15 min", osoby: "pary", przyklad: true,
    przebieg: "Wybierz emocję z koła Plutchika. Scena zaczyna się od jej najsłabszego stopnia i przez trzy szczeble dochodzi do najsilniejszego. Każdy szczebel musi mieć powód w propozycji partnera.",
    cel: "Precyzja w dawkowaniu emocji. Emocja jako skutek, a nie pomysł.",
    wariacje: "Zjazd w dół. Przejście w emocję przeciwną.",
    zrodlo: "na podstawie modelu Plutchika"
  },
  {
    nazwa: "Osiem działań", tagi: ["ruch", "postać", "grupa"], czas: "20 min", osoby: "cała grupa", przyklad: true,
    przebieg: "Chodzimy po sali w jakości jednego z ośmiu działań Labana. Z tej jakości rodzi się postać: jak siada, jak mówi, czego chce. Na koniec spotkanie dwóch postaci o przeciwnych jakościach.",
    cel: "Postać budowana od ruchu.",
    wariacje: "Zmiana jakości w trakcie sceny pod wpływem partnera.",
    zrodlo: "na podstawie Rudolfa Labana"
  },
  {
    nazwa: "Tresowanie delfina", tagi: ["grupa", "słuchanie", "ruch"], czas: "20–30 min", osoby: "cała grupa", zBliska: "tresowanie-delfina",
    przebieg: "Jedna osoba (delfin) wychodzi z sali. Reszta (trenerzy) ustala proste zadanie, na przykład zamknąć okno albo przesunąć kotarę. Delfin wraca i szuka. Trenerzy nic nie mówią: klaszczą, kiedy delfin robi krok w dobrą stronę, poza tym milczą. Delfinem zostaje ochotnik i w każdej chwili może przerwać.",
    cel: "Działanie zamiast zgadywania w głowie. Czytanie sygnałów grupy. Trenerzy ćwiczą wspólną uwagę i trafianie w czas.",
    wariacje: "Coraz trudniejsze zadania: przedmiot, sekwencja, drugi człowiek, sposób zamiast czynności (np. «idź tak, jakbyś się spieszył»). Wersja «głośniej, ciszej»: grupa nuci bez przerwy, głośniej, gdy delfin się zbliża. Kreatywny delfin: klaszczemy tylko za ruch, którego jeszcze nie było.",
    zrodlo: "Karen Pryor (Training Game); starsza wersja: Magic Music, Neva Boyd"
  }
];
