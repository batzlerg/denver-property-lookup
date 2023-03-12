<script lang="ts">
  import { clickOutside } from "../../directives";
  import type { PropertyData } from "../../types";
  import {
    matchingAddresses,
    propertyCache,
    currentAddress,
    errorMatchingAddress,
  } from "../../store";
  import { getPropertyData } from "../../services/propertyLookupService";

  async function getPropertyDataForAddress(address: string) {
    // e.g. "123 N MAIN ST"
    if (!$propertyCache[address]) {
      getPropertyData(address)
        .then((data: PropertyData) => {
          propertyCache.update((cache) => ({ ...cache, [address]: data }));
          currentAddress.set(address);
          matchingAddresses.set([]);
          errorMatchingAddress.set(false);
        })
        .catch(() => {
          errorMatchingAddress.set(true);
        });
    } else {
      matchingAddresses.set([]);
      currentAddress.set(address);
    }
  }

  function handleClickOutside(_event) {
    matchingAddresses.set([]);
    errorMatchingAddress.set(false);
  }
</script>

{#if $errorMatchingAddress}
  <div
    class="no-results"
    use:clickOutside
    on:click_outside={handleClickOutside}
  >
    No results found for input
  </div>
{:else if $matchingAddresses.length}
  <ul use:clickOutside on:click_outside={handleClickOutside}>
    {#each $matchingAddresses as address}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li on:click={() => getPropertyDataForAddress(address)}>
        {address}
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul,
  .no-results {
    background-color: var(--color-off-black);
    border-radius: 10px;
  }
  li,
  .no-results {
    padding: 0.5rem;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: left;
    overflow: hidden;
  }
  li {
    padding: 0.5rem;
    cursor: pointer;
  }
  li:hover {
    background-color: var(--color-dark-gray);
  }
  @media (prefers-color-scheme: light) {
    ul,
    .no-results {
      background-color: var(--color-white);
    }
    li:hover {
      background-color: var(--color-gray);
    }
  }
</style>
