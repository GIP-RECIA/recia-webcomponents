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

| Nom                               |   Type   | Obligatoire | Default | Description                                                              |
| --------------------------------- | :------: | :---------: | :-----: | ------------------------------------------------------------------------ |
| `base-api-url`                    | `string` |    `oui`    |         | URL de l'API REST MediaCentre.                                            |
| `user-info-api-url`               | `string` |    `oui`    |         | URL de l'API des informations utilisateurs.                               |
| `user-rights-api-url`             | `string` |    `oui`    |         | URL de l'API des droits utilisateurs.                                     |
| `user-resource-favorites-api-url` | `string` |    `oui`    |         | URL de l'API des préférences utilisateurs. (ici les ressources favorites) |

<br/>

```html
<mediacentre-ui base-api-url="" user-info-api-url="" user-rights-api-url="" user-resource-favorites-api-url="" />
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                            | Description                                  |
| ------------------------------ | -------------------------------------------- |
| `--ui-mediacentre-border-color` | Couleur associée au domaine de l'utilisateur.|
| `--ui-mediacentre-background-color` | Couleur du background du portail. |
| `--ui-mediacentre-font-color` | Couleur du texte. |
| `--ui-mediacentre-menu-title-background-color` | Couleur du background du titre du menu et de l'icône infos. |
| `--ui-mediacentre-category-hover-background-color` | Couleur du background au survol d'une catégorie. |
| `--ui-mediacentre-category-active-background-color`| Couleur du background d'une catégorie sélectionnée. |
