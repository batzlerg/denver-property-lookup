<script lang="ts">
  import { onMount } from "svelte";
  import { locationAddress } from "./store";
  import { getLocationAddress } from "./services/mapsService";
  let canUseLocation = true;

  onMount(() => {
    if (!navigator.geolocation) {
      canUseLocation = false;
    }
  });

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        getLocationAddress(latitude, longitude).then((result) => {
          locationAddress.set(result);
        });
      }
    );
  }
</script>

{#if canUseLocation}
  <div>
    <button on:click={getLocation}>Get Location</button>
  </div>
{:else}
  <div>
    This browser is not capable of using geolocation. Please type in an address.
  </div>
{/if}
