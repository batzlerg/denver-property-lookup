<script lang="ts">
  import type { LocationAddress, PropertyData } from "./types";
  import { locationAddress, propertyCache } from "./store";
  import { getPropertyData } from "./services/propertyLookupService";
  import PropertyInfo from "./PropertyInfo.svelte";

  let currentPropertyData: PropertyData;

  async function getPropertyDataForAddress({
    addressComponents,
  }: LocationAddress) {
    // e.g. "123 N MAIN ST"
    const addressKey = (
      addressComponents[0].short_name +
      " " +
      addressComponents[1].short_name
    ).toUpperCase();
    if (!currentPropertyData) {
      getPropertyData(addressKey).then((data: PropertyData) => {
        propertyCache.update((cache) => ({ ...cache, [addressKey]: data }));
        currentPropertyData = $propertyCache[addressKey];
      });
    }
  }
</script>

<ul>
  {#each $locationAddress as address}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li on:click={() => getPropertyDataForAddress(address)}>
      {address.formattedAddress}
    </li>
  {/each}
  {#if currentPropertyData}
    <PropertyInfo data={currentPropertyData} />
  {/if}
</ul>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 1rem;
    cursor: pointer;
    border-radius: 10px;
  }
  li:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
