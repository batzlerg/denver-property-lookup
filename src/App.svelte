<script lang="ts">
  import AddressSelector from "./lib/AddressSelector/index.svelte";
  import PropertyData from "./lib/PropertyData/index.svelte";
  import { propertyCache, currentAddress } from "./lib/store";
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:wght@700;900&display=swap"
  rel="stylesheet"
/>

<main>
  <h1>Denver Property Lookup</h1>
  <AddressSelector />
  <PropertyData data={$propertyCache[$currentAddress]} />
</main>

<style>
  main {
    max-width: 80rem;
    height: 100%;
    padding: 0;
    transition: 1s all;
  }
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    font-weight: 900;
    margin-top: 0;
  }
  @media (max-width: 720px) {
    h1 {
      font-size: 2.5em;
    }
  }
</style>
