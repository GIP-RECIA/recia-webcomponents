# ui-ressouces-gar

UI des ressources du GAR en Vue.js.

- [ui-ressouces-gar](#ui-ressouces-gar)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/ui-ressouces-gar
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/ui-ressouces-gar';
```

Dans une page HTML :

```html
<script src="./path/to/ui-ressouces-gar.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const uiRessourcesGar = document.createElement('ui-ressouces-gar');
document.body.appendChild(uiRessourcesGar);
```

## Paramètres

Propriétés disponibles :

| Nom                                   |   Type   | Obligatoire | Default | Description                                             |
| ------------------------------------- | :------: | :---------: | :-----: | ------------------------------------------------------- |
| `base-api-url`                        | `string` |    `oui`    |         | URL de l'API REST des ressources diffusables            |
| `ressources-diffusables-api-uri`      | `string` |    `oui`    |         | URI de la route GET des ressources diffusables          |
| `ressources-diffusables-size-api-uri` | `string` |    `oui`    |         | URI de la route GET du nombre de ressources diffusables |
| `user-info-api-url`                   | `string` |    `oui`    |         | URL de l'API des informations utilisateurs              |

<br/>

```html
<ui-ressources-gar
  base-api-url=""
  ressources-diffusables-api-uri=""
  ressources-diffusables-size-api-uri=""
  user-info-api-url=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                                                   | Description                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| `--ui-ressources-gar-ressources-title-color`          | Permet de modifier la couleur des tites des cartes ressources |
| `--ui-ressources-gar-button-background-color`         | Permet de modifier la couleur de fond des boutons             |
| `--ui-ressources-gar-button-background-color-success` | Permet de modifier la couleur de fond des boutons de succès   |
| `--ui-ressources-gar-button-text-color`               | Permet de modifier la couleur du texte des boutons            |
| `--ui-ressources-gar-button-text-color-success`       | Permet de modifier la couleur du texte des boutons de succès  |
| `--ui-ressources-gar-button-border-radius`            | Permet de modifier le radius des boutons                      |
| `--ui-ressources-gar-card-border-radius`              | Permet de modifier le radius des cartes                       |
| `--ui-ressources-gar-margin`                          | Permet de modifier le margin global                           |
| `--ui-ressources-gar-padding`                         | Permet de modifier le padding global                          |
