# Documentation 
- [Documentation](#documentation)
  - [Installation](#installation)
  - [Paramètres](#paramètres)


UI de paramétrage d'établissement en Vue.js


## Installation

1. Installation via npm :

```sh
npm install @gip-recia/param-etab
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/param-etab';
```

Dans une page HTML :

```html
<script src="./dist/param-etab.min.js"></script>
```

## Paramètres
| Nom                                   |   Type   | Obligatoire | Default | Description                                             |
| ------------------------------------- | :------: | :---------: | :-----: | ------------------------------------------------------- |
| `base-api-url`                        | `string` |    `oui`    |         | URL de l'API REST de param etab                         |
| `param-etab-api`                      | `string` |    `oui`    |         | URI de la route GET de param etab                       |
| `user-info-api-url`                   | `string` |    `oui`    |         | URL de l'API des informations utilisateurs              |


``` html
<param-etab
    base-api-url=""
    param-etab-api=""
    user-info-api-url=""
/>
```