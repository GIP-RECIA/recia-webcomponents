# Info-Modal

Info-Modal est un webcomponent s'appuyant sur la librairie Lit pour afficher une modale d'information.

- [Info-Modal](#info-modal)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/info-modal
```

2. Importation du composant :

Dans un module JavaScript :

```
import '@gip-recia/info-modal';
```

Dans une page HTML :

```html
<script src="./path/to/info-modal.min.js"></script>
```

3. Ajout du component sur une page HTML :

```js
const infoModal = document.createElement('info-modal');
document.body.appendChild(infoModal);
```

## Paramètres

Propriétés disponibles :

| Nom         | Type        | Obligatoire | Description                                                           |
| ----------- | ----------- | ----------- | --------------------------------------------------------------------- |
| titleModal  | string      | non         | Le titre de la modale                                                 |
| debug       | boolean     | non         | Un booléen qui permet d'afficher les retour console ou non            |
| mainElement | HTMLElement | oui         | Balise main du DOM (la modale gère la navigation clavier dans le DOM) |

<br/>

```html
<info-modal
  titleModal=""
  debug
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                                           | Description                                                  |
| --------------------------------------------- | ------------------------------------------------------------ |
| --info-modal-background-modal-container-color | Couleur de fond de la modale                                 |
| --info-modal-background-modal-overlay-color   | Couleur d'arrière plan (donne le "focus visuel" à la modale) |
