<script lang="ts">
  import GetLocation from "./lib/GetLocation.svelte";
  import LocationData from "./lib/LocationData.svelte";
</script>

<main>
  <GetLocation />
  <LocationData />
</main>

<style>
  main {
    max-width: 100rem;
  }
</style>
