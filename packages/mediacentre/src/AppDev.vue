<template>
  <mediacentre-ui id="mediacentre-ui" />
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
}

mediacentre-ui {
  display: block;
  height: 100%;
  width: 100%;
}
/* Variables */
:root {
  --ui-mediacentre-background-color: #ffffff;
  --ui-mediacentre-font-color: #000000;
  --ui-mediacentre-border-color: #d35959;
  --ui-mediacentre-menu-title-background-color: #ededed;
}
</style>
