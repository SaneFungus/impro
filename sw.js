// Minimalny service worker: pozwala zainstalowac strone na telefonie.
// Niczego nie zapisuje w pamieci ani nie dziala offline - kazde wejscie
// pobiera swieza wersje z sieci (dzieki temu numery ?v=N dalej dzialaja).
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function () { /* bez przechwytywania: przegladarka robi swoje */ });
