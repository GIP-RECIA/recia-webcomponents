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
import '@gip-recia/mediacentre-ui';
```

Dans une page HTML :

```html
<script src="./path/to/mediacentre-ui.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const component = document.createElement('mediacentre-ui');
document.body.appendChild(component);
```

## Paramètres

Propriétés disponibles :

| Nom                               |   Type   | Obligatoire | Default | Description                                                                                                |
| --------------------------------- | :------: | :---------: | :-----: | ---------------------------------------------------------------------------------------------------------- |
| `mediacentre-context-url`         | `string` |    `non`    |         | contexte de l'URL.                                                                                         |
| `base-api-url`                    | `string` |    `non`    |         | URL de l'API REST MediaCentre.                                                                             |
| `user-info-api-url`               | `string` |    `non`    |         | URL de l'API des informations utilisateurs.                                                                |
| `user-rights-api-url`             | `string` |    `non`    |         | URL de l'API des droits utilisateurs.                                                                      |
| `get-user-favorite-resources-url` | `string` |    `non`    |         | URL de l'API pour récupèrer la liste des identifiants des ressources favorites de l'utilisateur.           |
| `put-user-favorite-resources-url` | `string` |    `non`    |         | URL de l'API pour modifier la liste des identifiants des ressources favorites de l'utilisateur.            |
| `fname-mediacentre-ui`            | `string` |    `non`    |         | Fname de la portlet du Mediacentre-UI (utilisé pour la gestion des ressources favorites de l'utilisateur). |

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
