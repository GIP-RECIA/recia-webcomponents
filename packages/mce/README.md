# mce-ui

- [mce-ui](#mce-ui)
  - [Installation](#installation)
  - [Paramètres](#paramètres)
  - [Variables CSS](#variables-css)
    - [Modification de style](#modification-de-style)

## Installation

1. Installation via npm :

```sh
npm install @gip-recia/mce
```

2. Importation du composant :

Dans un module JavaScript :

```js
import '@gip-recia/mce'
```

Dans une page HTML :

```html
<script src="./path/to/mce.min.js"></script>
```

3. Ajout du composant sur une page HTML :

```js
const component = document.createElement('mce-ui')
document.body.appendChild(component)
```

## Paramètres

mce-ui:

| Nom | Type | Obligatoire | Default | Description |
| --- | :-: | :-: | :-: | --- |
| `mce-api` | `string` | `oui` | | URL de l'API REST MCE. |
| `user-info-api-url` | `string` | `oui` | | URL de l'API des informations utilisateurs. |
| `avatar-default` | `string` | `non` | | URL de l'avatar par défaut. |

<br/>

```html
<mce-ui
  mce-api=""
  user-info-api-url=""
  avatar-default=""
/>
```

## Variables CSS

### Modification de style

Plusieurs variables CSS peuvent être définies pour personnaliser le webcomponent :

| Nom | Description |
| --- | --- |
| `--recia-body` | Couleur du texte par défaut. |
| `--recia-body-bg` | Couleur de fond de la page. |
| `--recia-basic-black` | Noir principal. |
| `--recia-basic-black-lighter` | Noir clair (texte secondaire). |
| `--recia-basic-grey` | Fond gris. |
| `--recia-primary` | Couleur principale. |
| `--recia-btn-primary` | Couleur des boutons primaires. |
| `--recia-stroke` | Couleur des bordures/séparateurs. |
| `--recia-hover` | Couleur de fond au survol. |
| `--recia-favorite` | Couleur des favoris. |
| `--recia-system-blue` | Bleu système (info/succès). |
| `--recia-system-red` | Rouge système (erreur). |
| `--recia-body-font-size` | Taille de police de base. |
| `--recia-font-size-h3` | Taille de police des titres h3. |
| `--recia-font-size-h4` | Taille de police des titres h4. |
| `--recia-font-size-lg` | Texte large. |
| `--recia-font-size-sm` | Texte petit. |
| `--recia-font-size-xs` | Texte très petit. |
| `--recia-font-size-xxs` | Texte extra petit. |
| `--recia-shadow-neutral` | Ombre neutre des cartes. |
| `--recia-shadow-low-elevation` | Ombre basse. |
| `--recia-shadow-strong` | Ombre forte (modale). |
