<template>
   <q-layout> <!-- Be sure to play with the Layout demo on docs -->

      <q-layout-header >
         <q-toolbar color="body-background">
            <q-toolbar-title>
               <router-link to="generateur"><img alt="Emulsion" src="~assets/logo.svg"></router-link>
            </q-toolbar-title>
         </q-toolbar>
      </q-layout-header>

      <q-page-container>
      <div style="height:50px; background-color:#fff;" />
         <!-- This is where pages get injected -->
         <router-view />
      </q-page-container>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="orange"
      >
        <!--<q-fab-action @click="link_configuration" color="orange" class="white" icon="settings" />-->
        <q-fab-action @click="link_bugs" color="orange" class="white" icon="bug report" />
      </q-fab>
   </q-page-sticky>


   </q-layout>
</template>

<script>
export default {
  methods: {
    link_configuration () {
      this.$router.push({path: '/configuration'})
    },
    link_bugs (icon) {
      this.$router.push({path: '/bugs'})
    }
  }
}
</script>

<style>
</style>
