# param-etab

- [param-etab](#param-etab)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

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

Propriétés disponibles :

| Nom                 |   Type   | Obligatoire | Default | Description                                |
| ------------------- | :------: | :---------: | :-----: | ------------------------------------------ |
| `param-etab-api`    | `string` |    `oui`    |         | URI de la route GET de param etab          |
| `user-info-api-url` | `string` |    `oui`    |         | URL de l'API des informations utilisateurs |
| `default-logo-icon` | `string` |    `oui`    |         | URL de logo etab par défaut                |

<br/>

```html
<param-etab
  param-etab-api="" 
  user-info-api-url="" 
  default-logo-icon=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom                                                   | Description                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------- |
| `--param-etab-button-background-color`                | Permet de modifier la couleur de fond des boutons             |
| `--param-etab-button-text-color`                      | Permet de modifier la couleur de texte des boutons            |
| `--param-etab-input-text-focus-color`                 | Permet de modifier la couleur du focus du texte saisi         |
