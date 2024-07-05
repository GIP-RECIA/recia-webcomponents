# wisemapping-webcomponent

Wisemapping WebComponent

- [wisemapping-webcomponent](#wisemapping-webcomponent)
  - [Installation](#installation)
  - [Paramètres](#paramètres)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/wisemapping-webcomponent
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/wisemapping-webcomponent';
```

Dans une page HTML :

```html
<script src="./path/to/wisemapping-webcomponent.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const wisemappingEditor = document.createElement('wisemapping-editor');
document.body.appendChild(wisemappingEditor);
```

## Paramètres

| Nom                   |                                             Type                                              |           Requis           | Default | Description                       |
| --------------------- | :-------------------------------------------------------------------------------------------: | :------------------------: | :-----: | --------------------------------- |
| `persistance-api-url` |                                           `string`                                            |           `true`           |         | URL du fichier (GET & PUT)        |
| `file-id`             |                                           `string`                                            |           `true`           |         | Identifiant du fichier            |
| `token`               |                                           `string`                                            | token ou user-info-api-url |         | Token utilisateur                 |
| `user-info-api-url`   |                                           `string`                                            | token ou user-info-api-url |         | URL des informations utilisateurs |
| `mode`                | `viewonly \| edition-owner \| edition-editor \| edition-viewer \| showcase \| edition-locked` |           `true`           |         | Mode de rendu de l'éditeur        |

<br/>

```html
<wisemapping-editor persistance-api-url="" file-id="" token="" user-info-api-url="" mode="" />
```
