# template-webcomponent-vue3

1. Remplacez tous les `xxx` par le nom du projet/dépôt git.
2. Installez les dépendances `yarn`.
3. Initialisez husky `yarn prepare`.
4. Initialisez le fichier d'environnement `yarn predev`.

---

# xxx

- [xxx](#xxx)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/xxx
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/xxx';
```

Dans une page HTML :

```html
<script src="./path/to/xxx.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const component = document.createElement('xxx');
document.body.appendChild(component);
```

## Paramètres

Propriétés disponibles :

| Nom                 |   Type   | Obligatoire | Default | Description                                |
| ------------------- | :------: | :---------: | :-----: | ------------------------------------------ |
| `base-api-url`      | `string` |    `oui`    |         | URL de l'API REST                          |
| `user-info-api-url` | `string` |    `oui`    |         | URL de l'API des informations utilisateurs |

<br/>

```html
<xxx
  base-api-url=""
  user-info-api-url=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définis pour personnaliser le webcomponent :

| Nom | Description |
| --- | ----------- |
| ``  |             |
