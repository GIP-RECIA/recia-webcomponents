# mediacentre-ui

- [mediacentre-ui](#mediacentre-ui)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/mediacentre-ui
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/mediacentre-ui'
```

Dans une page HTML :

```html
<script src="./path/to/mediacentre-ui.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const component = document.createElement('mediacentre-ui')
document.body.appendChild(component)
```

## Paramètres

Propriétés disponibles :

| Nom                               |   Type   | Obligatoire | Default | Description                                                                                                |
| --------------------------------- | :------: | :---------: | :-----: | ---------------------------------------------------------------------------------------------------------- |
| `base-api-url`                    | `string` |    `non`    |         | URL de l'API REST MediaCentre.                                                                             |
| `config-api-url`                  | `string` |    `non`    |         | URL de la configuration de l'API REST MediaCentre.                                                         |
| `gestion-api-url`                 | `string` |    `non`    |         | URL des informations de gestion du GAR de de l'API REST MediaCentre.                                       |
| `user-info-api-url`               | `string` |    `non`    |         | URL de l'API des informations utilisateurs.                                                                |
| `user-rights-api-url`             | `string` |    `non`    |         | URL de l'API des droits utilisateurs.                                                                      |
| `get-user-favorite-resources-url` | `string` |    `non`    |         | URL de l'API pour récupèrer la liste des identifiants des ressources favorites de l'utilisateur.           |
| `put-user-favorite-resources-url` | `string` |    `non`    |         | URL de l'API pour modifier la liste des identifiants des ressources favorites de l'utilisateur.            |
| `fname-mediacentre-ui`            | `string` |    `non`    |         | Fname de la portlet du Mediacentre-UI (utilisé pour la gestion des ressources favorites de l'utilisateur). |
| `uai-current`                     | `string` |    `non`    |         | Clé de la soffit pour obtenir la valeur de l'UAI de l'établissement courant.                               |
| `uai`                             | `string` |    `non`    |         | Clé de la soffit pour obtenir la valeur de la liste des UAI des établissements de l'utilisateur.           |
| `help-location`                   | `string` |    `non`    |         | URL de la page d'aide du Médiacentre.                                                                      |

<br/>

```html
<mediacentre-ui
  mediacentre-context-url=""
  base-api-url=""
  user-info-api-url=""
  user-rights-api-url=""
  get-user-favorite-resources-url=""
  put-user-favorite-resources-url=""
  fname-mediacentre-ui=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                                                 | Description                                                  |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `--ui-mediacentre-border-color`                     | Couleur associée au domaine de l'utilisateur.                |
| `--ui-mediacentre-background-color`                 | Couleur de fond du composant (la même que celle du portail). |
| `--ui-mediacentre-card-background-color`            | Couleur de fond des cartes ressources.                       |
| `--ui-mediacentre-font-color`                       | Couleur du texte.                                            |
| `--ui-mediacentre-menu-title-background-color`      | Couleur de fond du titre du menu et de l'icône infos.        |
| `--ui-mediacentre-category-hover-background-color`  | Couleur de fond au survol d'une catégorie.                   |
| `--ui-mediacentre-category-active-background-color` | Couleur de fond d'une catégorie sélectionnée.                |
| `--recia-btn-primary-bg`                            | Couleur de fond des boutons et des selects.                  |
| `--recia-btn-primary-color`                         | Couleur du texte des boutons et des selectse.                |
| `--mediacentre-menu-bg`                             | Couleur de fond du menu.                                     |
| `--primary-transparent`                             | Couleur de fond des boutons.                                 |
| `--ui-mediacentre-category-active-background-color` | Couleur de fond d'une catégorie sélectionnée.                |
| `--ui-mediacentre-blue-link`                        | Couleur des hyperliens.                                      |
