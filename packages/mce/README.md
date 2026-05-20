# mce-ui

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Architecture des composants Vue — Projet MCE

## Vue d'ensemble

```
PageMce.ce.vue  (point d'entrée)
├── I18nHost.vue
├── UserBaseInfo.vue
│   └── AvatarUser.ce.vue
├── ListeOnglet.vue.ce ( menu de navigation )
└── SectionOnglet.ce.vue ( routeur d'onglet )
    │  
    ├──                   InformationPersonnelle.ce.vue
    │                         └── ChangeEmail.ce.vue
    │                     InfoGeneral.vue
    │                         ├── ClassesGroupesEleve.ce.vue
    │                         ├── ClassesGroupesProf.ce.vue
    │                         └── RelationUser.ce.vue
    │                                └── RelationUserDetail.ce.vue
    │                     
    ├──                   ServicesEnt.vue
    ├──                   ChangePassword.ce.vue
    └──                   FonctionsList.ce.vue
```
