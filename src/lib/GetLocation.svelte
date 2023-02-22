<script lang="ts">
  import { onMount } from "svelte";
  import { coordinates } from "./store";
  let canUseLocation = true;

  onMount(() => {
    if (!navigator.geolocation) {
      canUseLocation = false;
    }
  });

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        coordinates.set({
          lat: latitude,
          long: longitude,
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
