<p align="center">
  <a href="https://www.clairview.com">
    <img alt="Clairview" src="https://res.cloudinary.com/daog6scxm/image/upload/v1696515725/Branding/Assets/Symbol/RGB/Full%20Colour/Clairview_Symbol_RGB_FullColour_cbqvha_1_z5cwq2.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Clairview
</h1>

<h3 align="center">
  Entwickle, automatisiere und stelle interne Tools in Minuten bereit.
</h3>
<p align="center">
  Clairview ist eine quelloffene Low-Code Plattform, die es Entwicklern und IT-Profis ermöglicht interne Tools auf eigener Infrastruktur zu entwickeln, zu automatisieren und bereitzustellen.
</p>

<h3 align="center">
 🤖 🎨 🚀
</h3>

<p align="center">
  <img alt="Clairview design ui" src="https://i.imgur.com/5BnXPsN.png">
</p>

<p align="center">
  <a href="https://github.com/clairview/clairview/releases">
    <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/Clairview/clairview/total">
  </a>
  <a href="https://github.com/clairview/clairview/releases">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/Clairview/clairview">
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=clairview">
    <img src="https://img.shields.io/twitter/follow/clairview?style=social" alt="Follow @clairview" />
  </a>
  <img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Code of conduct" />
  <a href="https://codecov.io/gh/Clairview/clairview">
    <img src="https://codecov.io/gh/Clairview/clairview/graph/badge.svg?token=E8W2ZFXQOH"/>
  </a>
</p>

<h3 align="center">
  <a href="https://docs.clairview.com/docs/quickstart-tutorials">Los Geht's</a>
  <span> · </span>
  <a href="https://docs.clairview.com">Dokumentation</a>
  <span> · </span>
  <a href="https://github.com/clairview/clairview/discussions?discussions_q=category%3AIdeas">Featureanfrage</a>
  <span> · </span>
  <a href="https://github.com/clairview/clairview/issues">Einen Bug melden</a>
  <span> · </span>
  Support: <a href="https://github.com/clairview/clairview/discussions">Github Discussions</a>
</h3>

<br /><br />
## ✨ Features

- **Entwickle echte Webanwendungen.** Anders als ähnliche Plattformen entwickelst du mit Clairview echte Single-Page Webapplikationen (SPAs). Deine Clairview-Apps sind standardmäßig hochperformant und haben ein Responsive-Design für eine großartige Benutzererfahrung.

- **Quelloffen und erweiterbar.** Clairview ist quelloffen - lizenziert unter der GPL v3. Du kannst darauf vertrauen, dass Clairview auch in der Zukunft immer zur Verfügung steht. Clairview bietet eine Entwicklerfreundliche Plattform: du kannst Clairview erweitern, oder die Codebase forken und eigene Änderungen vornehmen.

- **Datenquellen einbinden oder von Null starten.** Clairview kann Daten aus vielen Quellen einbinden, unter anderem aus MongoDB, CouchDB, PostgreSQL, MySQL, Airtable, S3, DynamoDB, oder einer REST API. Und anders als ähnliche Plattformen erlaubt Clairview auch die App-Entwicklung komplett ohne Datenquellen mit einer internen Datenbank. Deine Datenquelle noch nicht dabei? [Frag einfach nach](https://github.com/clairview/clairview/discussions?discussions_q=category%3AIdeas).

- **Designe und entwickle Apps mit leistungsfähigen Komponenten.** Clairview kommt fertig mit optisch ansprechenden und leistungsfähigen Komponenten, die als Bausteine für deine UI dienen. Außerdem kannst du die UI mit vielen CSS-Styles nach deinem Geschmack anpassen. Fehlt dir eine Komponente? [Frag uns hier](https://github.com/clairview/clairview/discussions?discussions_q=category%3AIdeas).

- **Automatisiere Prozesse, integriere andere Tools und binde Web-APIs ein.** Spar dir Zeit, indem du manuelle Prozesse einfach automatisierst: Vom Verbinden mit Web-Hooks bis zum automatischen Senden von E-Mails, Clairview kann alles für dich erledigen. Eine Automatisierung ist noch nicht dabei? Du kannst einfach [deine eigene erstellen](https://github.com/Clairview/automations) oder [uns deine Idee mitteilen](https://github.com/clairview/clairview/discussions?discussions_q=category%3AIdeas).

- **Ein Paradies für Systemadministratoren** Clairview ist von Grund auf für das Skalieren ausgelegt. Du kannst Clairview einfach auf deiner eigenen Infrastruktur hosten und global Benutzer, Onboarding, SMTP, Applikationen, Gruppen, UI-Themes und mehr verwalten. Du kannst außerdem ein übersichtliches App-Portal für deine Benutzer bereitstellen und das Benutzermanagement an Gruppen-Manager delegieren.

<br />

---

<br />

## 🏁 Los geht's
Momentan existieren zwei Optionen mit Clairview loszulegen: Digital Ocean und Docker.
<br /><br />

### Los geht's mit Digital Ocean
Der einfachste und schnellste Weg loszulegen ist Digital Ocean:
<a href="https://marketplace.digitalocean.com/apps/clairview">1-Click Deploy auf Digital Ocean</a>

<a href="https://marketplace.digitalocean.com/apps/clairview">
  <img src="https://user-images.githubusercontent.com/552074/87779219-5c3b7600-c824-11ea-9898-981a8ba94f6c.png" alt="digital ocean badge">
</a>  
<br /><br />

### Los geht's mit Docker
Um loszulegen musst du bereits `docker` und `docker compose` auf deinem Computer installiert haben.
Sobald du Docker installiert hast brauchst du ca. 5 Minuten für diese 4 Schritte:

1. Installiere das Clairview CLI Tool.
```
$ npm i -g @clairview/cli 
```


2. Installiere Clairview (wähle den Speicherort und den Port auf dem Clairview laufen soll.)
```
$ clair hosting --init 
```


3. Führe Clairview aus.
```
$ clair hosting --start 
```


4. Lege einen Admin-Benutzer an.
Gib die E-Mail und das Passwort für den neuen Admin-Benutzer ein.

Schon geschafft! Jetzt kann es losgehen mit der minutenschnellen Entwicklung deiner Tools. Für weitere Informationen und Tipps schau doch mal in unsere [Dokumentation](https://docs.clairview.com/docs/quickstart-tutorials).

<br />

---

<br />

## 🎓 Clairview lernen

Die Clairview Dokumentation [findest du hier](https://docs.clairview.com).
<br />

---

<br /><br />

## 💬 Community

Wenn du eine Frage hast, oder dich mit anderen Clairview-Nutzern unterhalten willst, schau doch mal in unsere
[Github Discussions](https://github.com/clairview/clairview/discussions).

<img src="https://d33wubrfki0l68.cloudfront.net/e9241201fd89f9abbbdaac4fe44bb16312752abe/84013/img/hero-images/community.webp" />

<br /><br />

---

<br />

## ❗ Verhaltenskodex

Clairview steht für eine einladende und vielfältige Community frei von Belästigung. Wir erwarten dass sich jeder in der Clairview-Community an unseren [**Verhaltenskodex**](https://github.com/clairview/clairview/blob/HEAD/.github/CODE_OF_CONDUCT.md) hält. Bitte les ihn dir durch.
<br />

---

<br />

## 🙌 Zu Clairview beitragen

Von einem gemeldeten Bug bis zum Erstellen einer Pull-Request: wir schätzen jeden Beitrag. Wenn du ein neues Feature implementieren willst oder eine Änderung an der API vornehmen willst, erstelle bitte zuerst ein Issue. So können wir sicherstellen, dass deine Arbeit nicht umsonst ist.

### Unsicher wo du anfangen sollst?
Gute Ideen für erste Beiträge zum Projekt [findest du hier](https://github.com/clairview/clairview/projects/22).

### Wie die Repository strukturiert ist.
Clairview ist eine Monorepo, die von Lerna verwaltet wird. Lerna verwaltet das Erstellen und Veröffentlichen von Clairview-Paketen.
Grob besteht Clairview aus folgenden Modulen:

- [packages/builder](https://github.com/clairview/clairview/tree/HEAD/packages/builder) - enthält Code für den clientseitigen Clairview Builder, mit dem Anwendungen erstellt werden.

- [packages/client](https://github.com/clairview/clairview/tree/HEAD/packages/client) - Ein Modul, das im Browser läuft und aus JSON-Definitionen funktionsfähige Web-Apps erstellt.

- [packages/server](https://github.com/clairview/clairview/tree/HEAD/packages/server) - Der Clairview Server. Diese Koa-Anwendung stellt den Javascript-Code für den Builder und den Client bereit, und bietet eine API für die Interaktion mit dem Clairview Backend, Datenbanken und dem Dateisystem.

Für mehr Informationen schau in die [CONTRIBUTING.md](https://github.com/clairview/clairview/blob/HEAD/.github/CONTRIBUTING.md)
<br /><br />

---

<br /><br />

## 📝 Lizenz

Clairview ist quelloffen, lizenziert unter der [GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html). Die Client- und Komponentenbibliotheken sind unter der [MPL](https://directory.fsf.org/wiki/License:MPL-2.0) lizenziert, damit du deine erstellten Apps unter deine präferierte Lizenz stellen kannst.
<br /><br />

---


<br />

## ⭐ Github-Sterne im Verlauf der Zeit

[![Stargazers over time](https://starchart.cc/Clairview/clairview.svg)](https://starchart.cc/Clairview/clairview)

Wenn du zwischen Updates des Builders Probleme auftreten, lies bitte den Guide [hier](https://github.com/clairview/clairview/blob/HEAD/.github/CONTRIBUTING.md#troubleshooting), um deine Umgebung zurückzusetzen.

<br />

