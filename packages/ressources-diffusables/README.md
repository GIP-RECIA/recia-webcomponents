# ui-ressouces-gar

- [ui-ressouces-gar](#ui-ressouces-gar)
  - [Installation](#installation)
  - [Paramètres](#paramètres)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/ui-ressouces-gar
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/ui-ressouces-gar'
```

Dans une page HTML :

```html
<script src="./path/to/ui-ressouces-gar.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const uiRessourcesGar = document.createElement('ui-ressouces-gar')
document.body.appendChild(uiRessourcesGar)
```

## Paramètres

Propriétés disponibles :

| Nom                              |   Type   | Obligatoire | Default | Description                                    |
| -------------------------------- | :------: | :---------: | :-----: | ---------------------------------------------- |
| `base-api-url`                   | `string` |    `oui`    |         | URL de l'API REST des ressources diffusables   |
| `ressources-diffusables-api-uri` | `string` |    `oui`    |         | URI de la route GET des ressources diffusables |
| `user-info-api-url`              | `string` |    `oui`    |         | URL de l'API des informations utilisateurs     |
| `resources-per-page-default`     | `number` |    `oui`    |         | Nombre de résultats à afficher sur une page    |

<br/>

```html
<ui-ressources-gar
  base-api-url=""
  ressources-diffusables-api-uri=""
  ressources-diffusables-size-api-uri=""
  user-info-api-url=""
/>
```
