<template>
  <vs-navbar
    color="#7d33ff"
    text-white
    square
    center-collapsed
    v-model="active"
  >
    <template #left>
      <img src="~/static/bulma.png" alt="" />
    </template>
    <vs-navbar-item>
      Guide
    </vs-navbar-item>
    <vs-navbar-item>
      Documents
    </vs-navbar-item>
    <vs-navbar-item>
      Components
    </vs-navbar-item>
    <vs-navbar-item>
      license
    </vs-navbar-item>
    <template #right>
      <vs-button color="#fff" flat>Login</vs-button>
      <vs-button color="#fff" border>Get Started</vs-button>
    </template>
  </vs-navbar>
</template>

<style scoped>
img{
  width: 100px;
}
</style>