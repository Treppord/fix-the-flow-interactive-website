# Funda Connecties Systeem

Een connectie toevoegings en managing systeem. Om connecties te maken waar je huizen en lijsten mee kan delen.

## Ontwerp Keuzes

### Toelichting op Ontwerpkeuzes

In de gegeven HTML-, CSS- en JavaScript-code zijn verschillende ontwerpkeuzes gemaakt om de gebruikerservaring te verbeteren en een schone en georganiseerde structuur te behouden. Hieronder volgt een uitleg van enkele belangrijke ontwerpkeuzes met betrekking tot feedback, feedforward en zero state:

#### HTML-structuur:
- **Header Navigatie:**
  - **Feedback:** Een header met een logo en een navigatielink geeft duidelijk aan wat de identiteit van de applicatie is (funda) en stelt gebruikers in staat naar een andere pagina (Connections) te navigeren.
  - **Feedforward:** Door de navigatielink "Go to Connections" wordt aangegeven dat er verbindingen zijn en dat de gebruiker naar die sectie kan gaan.
  
- **Formulier voor Verbinding Toevoegen:**
  - **Zero State:** Het formulier bevat lege invoervelden en knoppen, wat aangeeft dat gebruikers hier informatie kunnen toevoegen.

#### CSS-stijlen:
- **Algemene Stijlen:**
  - **Achtergrondkleur en Lettertype:** Consistente achtergrondkleuren en lettertypen dragen bij aan een samenhangend ontwerp.
  - **Responsiviteit:** Mediaqueries worden gebruikt voor een responsief ontwerp op verschillende schermformaten.

- **Button Stijlen:**
  - **Feedback:** Knoppen hebben een opvallende achtergrondkleur en veranderen van kleur bij hover, waardoor interactieve feedback wordt gegeven.

- **Modal Stijlen:**
  - **Progressieve Onthulling:** Een modaal venster wordt weergegeven na het succesvol toevoegen van een verbinding, waardoor de gebruiker een bevestiging krijgt zonder de hoofdinterface te verstoren.

#### JavaScript-functionaliteit:
- **Toevoegen van Verbinding:**
  - **Feedback:** Een succesmodal wordt weergegeven na het succesvol toevoegen van een verbinding, wat feedback geeft aan de gebruiker.
  - **Reset en Stijlupdate:** Het formulier en geselecteerde verbinding worden gereset na het toevoegen, en knopstijlen worden bijgewerkt.

- **Selecteren van Verbinding:**
  - **Feedback:** Geselecteerde knoppen worden visueel onderscheiden van andere knoppen, waardoor de huidige status wordt aangegeven.

- **Weergeven van Verbindingen:**
  - **Zero State:** Als er geen verbindingen zijn, wordt een bericht weergegeven dat er nog geen boekingen zijn gemaakt.
  - **Dynamische Weergave:** Bestaande verbindingen worden dynamisch weergegeven in een agendaformaat.


## Code Conventies en Principes

### Forms (Zichtbaar op de openingspagina)

In de HTML-code zijn formuliervelden netjes gestructureerd met duidelijke labels voor een betere toegankelijkheid en begrijpelijkheid van formulieren. Bijvoorbeeld:

```html
<div class="form-group">
  <label for="name">Name:</label>
  <input type="text" id="name" placeholder="Enter your name" />
</div>

<div class="form-group">
  <label for="connection">Type Connection:</label>
  <div class="connection-buttons">
    <button name="connection-button" onclick="selectConnection('friends')">Friends</button>
    <button name="connection-button" onclick="selectConnection('family')">Family</button>
  </div>
</div>
```

### UI Events (Popup van een succesvolle toevoeging)

Voor het weergeven van een succesvolle toevoeging wordt een modal gebruikt. De bijbehorende JavaScript-functies openen en sluiten de modal. Bijvoorbeeld:

```html
<div id="success-modal" class="modal">
  <div class="modal-content">
    <span class="close" onclick="closeModal()">&times;</span>
    <p>Connection Added Successfully!</p>
  </div>
</div
```

### 3 Stappenplan JS (In de selectiemethode van het formulier)

Het JavaScript-bestand (`scripts/main.js`) bevat functies voor het verwerken van formuliergegevens in drie stappen:

1. **Data verzamelen:**
```javascript
   const name = document.getElementById("name").value;
   const date = document.getElementById("date").value;
   const email = document.getElementById("email").value;
```

2. **Data valideren:**
```
if (!name || !date || !email || !selectedConnection) {
  alert("Please fill in all fields and select a connection type before contact.");
  return;
}
```

3. **Data verwerken en weergeven van de successmodal:**
```javascript
const connection = selectedConnection;
const contact = { name, connection, date, email };

// Save de contact naar sessionStorage
const bookings = JSON.parse(sessionStorage.getItem("bookings")) || [];
bookings.push(contact);
sessionStorage.setItem("bookings", JSON.stringify(bookings));

// Display de successmodal
const modal = document.getElementById("success-modal");
modal.style.display = "block";

// Reset het formulier en de geselecteerde connectie
document.getElementById("name").value = "";
document.getElementById("date").value = "";
document.getElementById("email").value = "";
selectedConnection = null;

// Update de stijl van de knoppen
document.querySelectorAll("[name='connection-button']").forEach((button) => {
  button.classList.remove("selected");
});

displayConnections(); // Optioneel, afhankelijk van de verdere functionaliteit
```





## User Story

**User Story: Huizen Delen op Funda**

Als een gebruiker van de Funda-website wil ik de mogelijkheid hebben om huizen aan mijn persoonlijke lijst toe te voegen, zodat ik mijn favorieten kan bijhouden en ze gemakkelijk kan delen met vrienden en familie. 

**Acceptatiecriteria:**
1. Als ingelogde gebruiker wil ik een "Toevoegen aan Mijn Lijst" knop zien op de detailpagina van elk huis.
2. Als ik op de knop klik, wordt het huis aan mijn persoonlijke lijst toegevoegd.
3. Ik wil de optie hebben om mijn lijst met opgeslagen huizen te bekijken en beheren.
4. Als ik mijn lijst bekijk, wil ik de mogelijkheid hebben om specifieke huizen te delen met vrienden en familie.
5. Gedeelde huizen moeten toegankelijk zijn via een unieke link, zelfs als de ontvanger geen account heeft op Funda.
6. Ik wil de gedeelde lijst kunnen bijwerken met nieuwe toevoegingen of verwijderingen.

**Scenario: Huizen Delen met Vrienden en Familie**
1. Nadat ik een huis aan mijn lijst heb toegevoegd, navigeer ik naar mijn profiel.
2. Op mijn profielpagina zie ik een overzicht van mijn opgeslagen huizen.
3. Voor elk huis heb ik een "Delen" knop.
4. Ik klik op de "Delen" knop van een specifiek huis en krijg een unieke link die ik kan delen.
5. Ik stuur de link naar een vriend.
6. Mijn vriend opent de link en kan het gedeelde huis bekijken, zelfs zonder een Funda-account.

Deze user story stelt gebruikers in staat om hun huizen op Funda te organiseren, hun favorieten te delen en gemakkelijk informatie over interessante woningen uit te wisselen met vrienden en familie.

## User Test

**Testplan voor Huizen Delen op Funda**

1. **Takenlijst:**
   - Voeg een connectie toe aan je connecties lijst op Funda.
   - Beheer je opgeslagen connecties.

2. **Scenario's:**
   - *1 Taak: Voeg een connectie toe aan je Funda vriendenlijst.*
     - *Scenario:* Je bent ingelogd op Funda en je hebt een huis gevonden dat je interessant vindt. Dit wil je delen met een familielid als potentieel huis om naar te verhuizen, maar om                       dat te doen moet je ze toevoegen.

   - *2 Taak: Beheer je toegevoegde connecties door ze te bekijken.*
     - *Scenario:* Je wilt graag weten of je je oma een tijdje geleden correct heb toegevoegd als een vriend nadat ze je dat voor de 10de keer hebt gevraagd.

3. **Proef-test de scenario’s:**
   - 1: Duidelijke interface, birthday is niet per see nodig maar wel leuk! Allen buttons werken en zijn toegankelijk.
  
   - 2: Connection Manager is snel te vinden en daardoor had ik gelijk een goed beeld of ik mijn oma wel of niet heb toegevoegd.

4. **Test met gebruikers:**
   - Geen comments van de tester, maar ik merkte persoonlijk 1 aanpassing. Ik wil de calender button iets aantrekkelijker maken voor de gebruiker om erop te klikken. Ipv typen.



## Beschrijving

Early Wireflow Schets </br>
<img src="https://i.imgur.com/ASotiss.jpg" width="350px" height="350px">

Breakdown Schets</br>
<img src="https://i.imgur.com/V9BLP53.jpg" width="350px" height="350px">

Lighthouse Toegankelijkheids Test</br>
<img src="https://i.imgur.com/jNgYQoR.png" width="650px" height="400px">

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? -->

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).

