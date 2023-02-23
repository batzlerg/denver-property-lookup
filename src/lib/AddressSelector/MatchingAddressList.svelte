<script lang="ts">
  import type { PropertyData } from "../types";
  import { matchingAddresses, propertyCache, currentAddress } from "../store";
  import { getPropertyData } from "../services/propertyLookupService";

  async function getPropertyDataForAddress(address: string) {
    // e.g. "123 N MAIN ST"
    if (!$propertyCache[address]) {
      getPropertyData(address).then((data: PropertyData) => {
        propertyCache.update((cache) => ({ ...cache, [address]: data }));
      });
    }
    currentAddress.set(address);
    matchingAddresses.set([]);
  }
</script>

{#if $matchingAddresses.length}
  <ul>
    {#each $matchingAddresses as address}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li on:click={() => getPropertyDataForAddress(address)}>
        {address}
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }
  li {
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 10px;
  }
  li:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
