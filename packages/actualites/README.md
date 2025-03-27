# actualites

- [actualites](#actualites)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
    - [carrousel-ui](#carrousel-ui)
    - [all-news](#all-news)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/actualites
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/actualites'
```

Dans une page HTML :

```html
<script src="./path/to/actualites.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const actualites = document.createElement('')
document.body.appendChild(actualites)
```

## Paramètres

Propriétés disponibles :

### carrousel-ui

| Nom                                 |   Type   | Obligatoire | Default | Description                                                                         |
| ----------------------------------- | :------: | :---------: | :-----: | ----------------------------------------------------------------------------------- |
| `user-info-api-url`                 | `string` |   `true`    |         | URL dédiée à la récupération du token via le portail                                |
| `get-user-news-url`                 | `string` |   `true`    |         | URL permettant de récupérer une liste d'item en fonction des paramètres de filtrage |
| `get-item-by-id-url`                | `string` |   `true`    |         | URL permettant de récupérer les informations d'un item                              |
| `get-news-reading-informations-url` | `string` |   `true`    |         | URL permettant de récupérer les informations de lecture de l'utilisateur            |
| `set-reading-url`                   | `string` |   `true`    |         | URL permettant la gestion de la lecture d'un item en fonction de l'utilisateur      |
| `all-news-page-url`                 | `string` |   `true`    |         | Url permettant d'accèder à la page 'toutes les actualités'                          |

<br/>

```html
<carrousel-ui
  user-info-api-url=""
  get-user-news-url=""
  get-item-by-id-url=""
  get-news-reading-informations-url=""
  set-reading-url=""
  all-news-page-url=""
/>
```

### all-news

| Nom                                 |   Type   | Obligatoire | Default | Description                                                                         |
| ----------------------------------- | :------: | :---------: | :-----: | ----------------------------------------------------------------------------------- |
| `user-info-api-url`                 | `string` |   `true`    |         | URL dédiée à la récupération du token via le portail                                |
| `get-user-news-url`                 | `string` |   `true`    |         | URL permettant de récupérer une liste d'item en fonction des paramètres de filtrage |
| `get-item-by-id-url`                | `string` |   `true`    |         | URL permettant de récupérer les informations d'un item                              |
| `get-news-reading-informations-url` | `string` |   `true`    |         | URL permettant de récupérer les informations de lecture de l'utilisateur            |
| `set-reading-url`                   | `string` |   `true`    |         | URL permettant la gestion de la lecture d'un item en fonction de l'utilisateur      |
| `back-url`                          | `string` |   `true`    |         | Url pointant vers l'acceuil                                                         |

```html
<all-news
  user-info-api-url=""
  get-user-news-url=""
  get-item-by-id-url=""
  get-news-reading-informations-url=""
  set-reading-url=""
  back-url=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                            |
| ------------------------------ |
| `--recia-white`                |
| `--recia-stroke`               |
| `--recia-basic-grey`           |
| `--recia-basic-black`          |
| `--recia-lighter-black`        |
| `--recia-primary`              |
| `--recia-primary-pressed`      |
| `--recia-secondary-hover`      |
| `--recia-secondary-pressed`    |
| `--recia-primary-20`           |
| `--recia-shadow-neutral`       |
| `--recia-shadow-strong`        |
| `--recia-shadow-hover`         |
| `--recia-shadow-low-elevation` |
