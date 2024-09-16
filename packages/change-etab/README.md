# change-etab

- [change-etab](#change-etab)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/change-etab
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/change-etab'
```

Dans une page HTML :

```html
<script src="./path/to/change-etab.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const changeEtab = document.createElement('change-etab')
document.body.appendChild(changeEtab)
```

## Paramètres

Propriétés disponibles :

| Nom                 |   Type    | Obligatoire | Default | Description                                |
| ------------------- | :-------: | :---------: | :-----: | ------------------------------------------ |
| `show`              | `boolean` |    `oui`    |         | activer/désactiver la modal                |
| `change-etab-api`   | `string`  |    `oui`    |         | URI de la route GET de change etab         |
| `user-info-api-url` | `string`  |    `oui`    |         | URL de l'API des informations utilisateurs |

<br/>

```html
<change-etab
  show="" 
  change-etab-api="" 
  user-info-api-url=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                                     | Description                                        |
| --------------------------------------- | -------------------------------------------------- |
| `--change-etab-button-background-color` | Permet de modifier la couleur de fond des boutons  |
| `--change-etab-button-text-color`       | Permet de modifier la couleur de texte des boutons |
