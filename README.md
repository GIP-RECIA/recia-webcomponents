# param-etab

- [param-etab](#param-etab)
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
<script src="./path/to/param-etab.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const paramEtab = document.createElement('param-etab');
document.body.appendChild(paramEtab);
```

## Paramètres

| Nom                 |   Type   | Obligatoire | Default | Description                                |
| ------------------- | :------: | :---------: | :-----: | ------------------------------------------ |
| `base-api-url`      | `string` |    `oui`    |         | URL de l'API REST de param etab            |
| `param-etab-api`    | `string` |    `oui`    |         | URI de la route GET de param etab          |
| `user-info-api-url` | `string` |    `oui`    |         | URL de l'API des informations utilisateurs |

<br/>

```html
<param-etab base-api-url="" param-etab-api="" user-info-api-url="" />
```
