<script lang="ts">
  import AddressSelector from "./lib/AddressSelector/index.svelte";
  import PropertyData from "./PropertyData/index.svelte";
  import { propertyCache, currentAddress } from "./lib/store";
</script>

<main>
  <h1>Denver Property Lookup</h1>
  <AddressSelector />
  <!-- <PropertyInfo address={$currentAddress} /> -->
  <PropertyData data={$propertyCache[$currentAddress]} />
</main>

<style>
  main {
    max-width: 100rem;
  }
</style>
