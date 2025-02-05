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

|                Nom                |  Type  | Obligatoire | Default |                                     Description                                     |
|:---------------------------------:|:------:|:-----------:|:-------:|:-----------------------------------------------------------------------------------:|
|              baseUrl              | string |    true     |   ""    |                                                                                     |
|         user-info-api-url         | string |    true     |   ""    |                Url dédiée à la récupération du token via le portail                 |
|        get-item-by-id-url         | string |    true     |   ""    |               Url permettant de récupérer les informations d'un item                |
|         get-user-news-url         | string |    true     |   ""    | Url permettant de récupérer une liste d'item en fonction des paramètres de filtrage |
| get-news-reading-informations-url | string |    true     |   ""    |      Url permettant de récupérer les informations de lecture de l'utilisateur       |
|          set-reading-url          | string |    true     |   ""    |   Url permettant la gestion de la lecture d'un item en fonction de l'utilisateur    |

<br/>

```html

```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom | Description |
|-----|-------------|

