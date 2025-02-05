# actualites

- [actualites](#actualites)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
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
<script src="./path/to/.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const xxx = document.createElement('')
document.body.appendChild(xxx)
```

## Paramètres

Propriétés disponibles :

| Nom                                 |   Type   | Obligatoire | Default | Description                                                                         |
| ----------------------------------- | :------: | :---------: | :-----: | ----------------------------------------------------------------------------------- |
| `base-url`                          | `string` |   `true`    |         |                                                                                     |
| `user-info-api-url`                 | `string` |   `true`    |         | URL dédiée à la récupération du token via le portail                                |
| `get-item-by-id-url`                | `string` |   `true`    |         | URL permettant de récupérer les informations d'un item                              |
| `get-user-news-url`                 | `string` |   `true`    |         | URL permettant de récupérer une liste d'item en fonction des paramètres de filtrage |
| `get-news-reading-informations-url` | `string` |   `true`    |         | URL permettant de récupérer les informations de lecture de l'utilisateur            |
| `set-reading-url`                   | `string` |   `true`    |         | URL permettant la gestion de la lecture d'un item en fonction de l'utilisateur      |

<br/>

```html
<carrousel-ui
  user-info-api-url=""
  base-url=""
  get-user-news-url=""
  get-item-by-id-url=""
  get-news-reading-informations-url=""
  set-reading-url=""
/>
```

```html
<all-news
  user-info-api-url=""
  base-url=""
  get-user-news-url=""
  get-item-by-id-url=""
  get-news-reading-informations-url=""
  set-reading-url=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom | Description |
| --- | ----------- |
|     |             |
