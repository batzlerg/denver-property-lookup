<script lang="ts">
  import AddressSelector from "./lib/AddressSelector/index.svelte";
  import PropertyData from "./lib/PropertyData/index.svelte";
  import { propertyCache, currentAddress } from "./lib/store";
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap"
  rel="stylesheet"
/>

<main>
  <h1>Denver Property Lookup</h1>
  <AddressSelector />
  <PropertyData data={$propertyCache[$currentAddress]} />
</main>

<style>
  main {
    max-width: 100rem;
    padding: 0 4rem;
    transition: 1s all;
  }
</style>
