# **Info-Modal**

Info-Modal est un webcomponent s'appuyant sur la librairie Lit pour afficher une modale d'information.


- [**Info-Modal**](#info-modal)
  - [**Installation**](#installation)
  - [**Paramètres**](#paramètres)
  - [**Variables CSS**](#variables-css)


## **Installation**

1. Installation via npm :

```shell
npm install @gip-recia/info-modal
```

2. Importation du webcomposant :

Dans un module JavaScript :

```
import '@gip-recia/info-modal';
```

Dans une page HTML :

```html
<script type="module">
  import './path/to/info-modal.js'
</script>
```

Ou directement la version minifiée :

```html
<script src="./path/to/info-modal.min.js"></script>
```

3. Ajout du webcomponent sur une page HTML (2 façons de faire) :

- En Javascript :

```js
const infoModal = document.createElement('info-modal')
document.body.appendChild(infoModal)
```

- En HTML :

```html
<info-modal titleModal="" debug=""></info-modal>
```

Il est conseillé de regarder [l'exemple d'utilisation de la modale.](https://github.com/GIP-RECIA/lit-webcomponents/blob/cab8eb7e03c32632aaef8bdf18f0648345c56d3b/packages/info-modal/samples/modal-example/modal-example.html) 

## **Paramètres**

Le webcomponent Info-Modal accepte les paramètres
suivants :


| Nom         | Type        | Obligatoire | Description                                                         |
| ----------- | ----------- | ----------- | ------------------------------------------------------------------- |
| titleModal  | string      | non         | Le titre de la modale.                                              |
| debug       | boolean     | non         | Un booléen qui permet d'afficher les retour console ou non.         |
| mainElement | HTMLElement | oui         | Balise main du DOM (la modale gère la navigation clavier dans le DOM). |

## **Variables CSS**

Le webcomponent Info-Modal accepte les variables css
suivantes :

| Nom                                           | Description                                                   |
| --------------------------------------------- | ------------------------------------------------------------- |
| --info-modal-background-modal-container-color | Couleur de fond de la modale.                                 |
| --info-modal-background-modal-overlay-color   | Couleur d'arrière plan (donne le "focus visuel" à la modale). |
