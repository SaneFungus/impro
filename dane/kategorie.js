// Kategorie: Plutchik, Laban, status (Johnstone), propozycje (Johnstone), Viewpoints.
// Edytuj teksty swobodnie. Unikaj cudzysłowów „ ” wewnątrz stringów — używaj « ».
window.DANE = window.DANE || {};

DANE.plutchik = {
  wstep: "Robert Plutchik (1927–2006), psycholog, zaproponował model ośmiu emocji podstawowych ułożonych w koło. Każda ma trzy stopnie natężenia (bliżej środka mocniej), każda ma przeciwieństwo po drugiej stronie koła, a sąsiednie emocje mieszają się w emocje złożone. Dla aktora to mapa: pozwala precyzyjnie wybrać, którą emocję i z jaką siłą gram, i dokąd scena może ją przesunąć.",
  // Kolejność wokół koła (zgodnie z modelem). Przeciwieństwo = element o 4 pozycje dalej.
  emocje: [
    { id: "radosc", nazwa: "radość", odcien: 50, stopnie: ["pogoda ducha", "radość", "ekstaza"],
      cialo: "Ciało się otwiera i unosi, oddech swobodny, ruch szuka przestrzeni.",
      zadanie: "Scena, w której pogoda ducha w trzech krokach dochodzi do ekstazy. Każdy krok musi mieć powód od partnera." },
    { id: "zaufanie", nazwa: "zaufanie", odcien: 88, stopnie: ["akceptacja", "zaufanie", "podziw"],
      cialo: "Ciało miękkie, zwrócone do partnera, odległość się zmniejsza.",
      zadanie: "Jedna postać stopniowo zaczyna podziwiać drugą za coś zupełnie banalnego." },
    { id: "strach", nazwa: "strach", odcien: 145, stopnie: ["obawa", "strach", "przerażenie"],
      cialo: "Ciało się kurczy i cofa, oddech wysoko, uwaga skacze po przestrzeni.",
      zadanie: "Graj obawę tak małą, że widz ledwo ją zauważa. Potem pozwól, by jeden skutek ją rozpędził." },
    { id: "zaskoczenie", nazwa: "zaskoczenie", odcien: 188, stopnie: ["rozproszenie", "zaskoczenie", "zdumienie"],
      cialo: "Zatrzymanie, ciało zastyga na ułamek sekundy, oczy się otwierają.",
      zadanie: "Każda kwestia partnera ma Cię zaskoczyć, nawet zupełnie zwyczajna. Szukaj prawdziwego zdziwienia, nie miny." },
    { id: "smutek", nazwa: "smutek", odcien: 215, stopnie: ["zaduma", "smutek", "rozpacz"],
      cialo: "Ciężar idzie w dół, ruch zwalnia, wzrok opada.",
      zadanie: "Scena o czymś drobnym (zgubiony długopis), w której zaduma powoli zamienia się w prawdziwy smutek." },
    { id: "wstret", nazwa: "wstręt", odcien: 280, stopnie: ["znudzenie", "wstręt", "odraza"],
      cialo: "Ciało się odsuwa, twarz i tułów odwracają się od źródła.",
      zadanie: "Postać znudzona wszystkim, czego dotyka. Znajdź jedną rzecz, która przebija znudzenie do odrazy." },
    { id: "zlosc", nazwa: "złość", odcien: 355, stopnie: ["irytacja", "złość", "wściekłość"],
      cialo: "Napięcie do przodu, szczęka i ręce twardnieją, ruch staje się bezpośredni.",
      zadanie: "Utrzymaj irytację przez całą scenę i nie pozwól jej wybuchnąć. Napięcie robi robotę." },
    { id: "oczekiwanie", nazwa: "oczekiwanie", odcien: 28, stopnie: ["zainteresowanie", "oczekiwanie", "czujność"],
      cialo: "Ciało pochylone ku przyszłości, gotowość, uwaga skupiona w jednym punkcie.",
      zadanie: "Dwie postaci czekają na coś, czego nie nazywają. Widz ma się domyślić, na co." }
  ],
  // Diady podstawowe: mieszanki sąsiednich emocji (indeks i oraz i+1).
  diady: ["miłość", "uległość", "bojaźń", "dezaprobata", "skrucha", "pogarda", "agresja", "optymizm"]
};

DANE.laban = {
  wstep: "Rudolf Laban (1879–1958), tancerz i teoretyk ruchu, opisał jakość ruchu przez czynniki wysiłku (Effort). Trzy z nich, czyli ciężar, czas i przestrzeń, dają po dwa bieguny, a ich kombinacje tworzą osiem podstawowych działań. Czwarty czynnik, przepływ, mówi, czy ruch jest swobodny, czy kontrolowany. Dla aktora to sposób, by zbudować postać od ruchu, zanim pojawi się słowo.",
  czynniki: [
    { id: "ciezar", nazwa: "Ciężar", bieguny: ["mocny", "lekki"], opis: "Ile siły wkładam w ruch i jak używam ciężaru ciała." },
    { id: "czas", nazwa: "Czas", bieguny: ["nagły", "trwały"], opis: "Czy ruch przyspiesza i jest pilny, czy rozciąga się i nie spieszy." },
    { id: "przestrzen", nazwa: "Przestrzeń", bieguny: ["bezpośrednia", "pośrednia"], opis: "Czy uwaga celuje w jeden punkt, czy obejmuje wiele kierunków naraz." }
  ],
  przeplyw: "Przepływ: związany (ruch kontrolowany, można go w każdej chwili zatrzymać) albo swobodny (ruch płynie, trudno go zatrzymać). Dodaj go jako czwartą warstwę do każdego z ośmiu działań.",
  // klucz: ciężar|czas|przestrzeń (0 = pierwszy biegun, 1 = drugi)
  dzialania: {
    "000": { nazwa: "pchnięcie", en: "punch / thrust", przyklad: "wbijanie gwoździa, cios, stanowcze «nie»", postac: "Ktoś, kto zawsze wie, czego chce, i nie zostawia miejsca na dyskusję." },
    "001": { nazwa: "cięcie", en: "slash", przyklad: "zamach kosą, odganianie osy, trzaśnięcie drzwiami", postac: "Wybuchowy, rozrzutny, zostawia za sobą bałagan." },
    "010": { nazwa: "naciskanie", en: "press", przyklad: "przesuwanie szafy, wyciskanie pasty do końca", postac: "Uparty, cierpliwie przekonujący, nie odpuszcza." },
    "011": { nazwa: "wyżymanie", en: "wring", przyklad: "wykręcanie mokrego ręcznika, przeciąganie się rano", postac: "Rozdarty wewnętrznie, męczy się z każdą decyzją." },
    "100": { nazwa: "stuknięcie", en: "dab", przyklad: "pisanie na klawiaturze, kropki pędzlem, dzwonek do drzwi", postac: "Precyzyjny, szybki, trochę nerwowy pedant." },
    "101": { nazwa: "strzepnięcie", en: "flick", przyklad: "strzepywanie okruchów, odganianie myśli, kokieteryjny gest", postac: "Lekki, roztrzepany, nic go długo nie zajmuje." },
    "110": { nazwa: "ślizganie", en: "glide", przyklad: "wygładzanie obrusu, łyżwiarz, spokojne tłumaczenie", postac: "Opanowany, uprzejmy, elegancki, czasem zbyt gładki." },
    "111": { nazwa: "unoszenie", en: "float", przyklad: "piórko na wietrze, dryfowanie na wodzie, marzenie", postac: "Bujający w obłokach, łagodny, nieuchwytny." }
  }
};

DANE.status = {
  wstep: "Keith Johnstone (1933–2023) pokazał, że status to coś, co się robi, a nie coś, co się ma. Każda kwestia, gest i spojrzenie podnosi albo obniża mój status wobec partnera. Status społeczny i grany to dwie różne rzeczy: lokaj może grać wysoko, a król nisko.",
  zasady: [
    { t: "Status się gra", o: "Nie jesteś wysoki albo niski. W każdej chwili robisz wysoki albo niski status. Zmiana jest zawsze możliwa." },
    { t: "Huśtawka", o: "Mogę podnieść siebie albo obniżyć partnera. Mogę też obniżyć siebie albo podnieść partnera. Różnica statusu napędza scenę." },
    { t: "Status wobec przestrzeni", o: "Status gra się też z miejscem i przedmiotami: kto rozsiada się w cudzym fotelu, a kto stoi przy drzwiach." },
    { t: "Pan i sługa", o: "Najczystsza para statusowa. Sługa gra nisko, ale jego zadaniem jest podtrzymywać wysoki status pana. Kiedy mu się to nie udaje, robi się komedia." }
  ],
  zachowania: {
    niski: ["przerywa kontakt wzrokowy i ukradkiem wraca spojrzeniem", "dotyka twarzy, włosów, ubrania", "zaczyna zdania od «yyy», tłumaczy się", "zajmuje mało miejsca, stopy do środka", "szybkie, drobne ruchy głowy"],
    sredni: ["swobodny kontakt wzrokowy", "ruch naturalny, bez napięcia", "dopasowuje się do partnera", "ani nie dominuje, ani nie ustępuje"],
    wysoki: ["utrzymuje kontakt wzrokowy", "głowa nieruchoma przy mówieniu", "mówi pełnymi zdaniami, bez pośpiechu", "zajmuje przestrzeń, ruchy wolne i pewne", "nie tłumaczy się"]
  }
};

DANE.propozycje = {
  wstep: "Słownik Keitha Johnstone'a opisuje, co dzieje się między partnerami w każdej sekundzie sceny.",
  hasla: [
    { t: "Propozycja (offer)", o: "Wszystko, co robi partner: słowo, gest, spojrzenie, nawet milczenie. Każda propozycja jest materiałem." },
    { t: "Blokowanie", o: "Odrzucenie albo zignorowanie propozycji. Zatrzymuje scenę, bo nic nie może się zmienić." },
    { t: "Akceptacja", o: "Przyjęcie propozycji jako prawdy w świecie sceny, a potem dołożenie czegoś od siebie." },
    { t: "Bądź oczywisty", o: "Nie szukaj oryginalności. Pierwsza, oczywista odpowiedź jest najbardziej Twoja i najczęściej najlepsza." },
    { t: "Ponowne włączenie", o: "Powrót do elementu z początku sceny. Daje widzowi poczucie, że historia jest zbudowana, a nie przypadkowa." },
    { t: "Poszerzanie i postęp", o: "Scena żyje, kiedy coś się zmienia. Rozwijaj to, co już jest, zamiast wymyślać nowe wątki." }
  ]
};

DANE.viewpoints = {
  wstep: "Viewpoints to język opisu czasu i przestrzeni na scenie, rozwinięty przez Mary Overlie oraz Anne Bogart i Tinę Landau. Dziewięć fizycznych punktów widzenia pozwala improwizować grupowo, słuchając całym ciałem.",
  czas: [
    { t: "Tempo", o: "Jak szybko lub wolno dzieje się ruch." },
    { t: "Czas trwania", o: "Jak długo trwa ruch, zanim się zmieni." },
    { t: "Odpowiedź kinestetyczna", o: "Spontaniczna reakcja ciała na ruch, który dzieje się obok." },
    { t: "Powtórzenie", o: "Powtarzanie ruchu, własnego albo cudzego." }
  ],
  przestrzen: [
    { t: "Kształt", o: "Zarys ciała w przestrzeni: linie, krzywe, kąty." },
    { t: "Gest", o: "Ruch, który coś znaczy: codzienny albo ekspresyjny." },
    { t: "Architektura", o: "Fizyczne otoczenie: ściany, podłoga, światło, przedmioty." },
    { t: "Relacja przestrzenna", o: "Odległość między ciałami na scenie." },
    { t: "Topografia", o: "Wzór, który ruch kreśli na podłodze." }
  ]
};

DANE.generator = {
  miejsca: ["przystanek PKS o świcie", "poczekalnia u weterynarza", "winda w bloku, która utknęła", "kulisy przed premierą", "kolejka w urzędzie", "dach kamienicy", "ostatni wagon nocnego pociągu", "kuchnia na weselu", "szatnia na basenie", "przymierzalnia w lumpeksie", "pusta sala gimnastyczna", "las podczas grzybobrania", "pralnia samoobsługowa", "korytarz szpitala", "camping nad jeziorem", "biuro rzeczy znalezionych", "tramwaj w godzinach szczytu", "peron na dworcu głównym", "galeria handlowa w sobotę", "festiwal muzyczny pod sceną", "trybuna na meczu", "plaża w upalny weekend", "lotnisko przy odwołanym locie", "rynek w dzień targowy", "poczekalnia na SOR-ze", "kolejka do kasy przed świętami"],
  relacje: ["rodzeństwo", "była para", "szef i stażysta", "sąsiedzi zza ściany", "nauczyciel i dawny uczeń", "dwoje nieznajomych", "przyjaciele od podstawówki", "teściowa i zięć", "kelner i stały gość", "dwoje konkurentów do tej samej nagrody", "dawni przyjaciele po latach", "rodzic i nastolatek", "dwoje po pierwszej randce", "wierzyciel i dłużnik", "wspólnicy po kłótni", "kochankowie, którzy się ukrywają", "autor plotki i jej bohater", "starsza osoba i młody opiekun", "dwoje rywali z dawnej szkoły", "ktoś, kto kłamie, i ktoś, kto zaczyna się domyślać"]
};
