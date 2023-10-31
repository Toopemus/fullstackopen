```mermaid
sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain: Käyttäjä kirjoittaa viestin ja painaa "Save"

    activate selain
    selain->>selain: Renderöi HTML uudelleen
    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    deactivate selain

    activate palvelin
    palvelin-->>selain: Selain vastaa pyyntöön koodilla 201 Created
    deactivate palvelin
```
