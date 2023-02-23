<script lang="ts">
  import AddressSelector from "./lib/AddressSelector/index.svelte";
  import PropertyInfo from "./lib/PropertyInfo/index.svelte";
  import { currentAddress } from "./lib/store";

  let mode: "location" | "manual" = "manual";
</script>

<main>
  <h1>Denver Property Lookup</h1>
  <AddressSelector />
  <PropertyInfo address={$currentAddress} />
</main>

<style>
  main {
    max-width: 100rem;
  }
</style>
