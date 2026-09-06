# Fugaz Agency — Website

Statische site. `index.html` is de live pagina.

## Lokaal bekijken
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structuur
- `index.html` — de pagina
- `assets/` — afbeeldingen, video's, fonts en scripts

De originele export was een "bundle": alle assets zaten als base64 in de HTML,
waardoor het bestand 17 MB was. Hier zijn ze uitgepakt naar losse bestanden.

## Deploy
Vercel: Framework Preset "Other", Output Directory leeg laten.
