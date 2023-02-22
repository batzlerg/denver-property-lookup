<script lang="ts">
  import GetLocation from "./lib/GetLocation.svelte";
  import LocationAddress from "./lib/LocationAddress.svelte";
</script>

<main>
  <GetLocation />
  <LocationAddress />
</main>

<style>
  main {
    max-width: 100rem;
  }
</style>
