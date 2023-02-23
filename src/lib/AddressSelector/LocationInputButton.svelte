<script lang="ts">
  import { onMount } from "svelte";
  import { matchingAddresses } from "../store";
  import { getAddressesMatchingLocation } from "../services/mapsService";
  export let setErrorMessage: (message: string) => void;
  let canUseGeolocation = true;

  onMount(() => {
    if (!navigator.geolocation) {
      setErrorMessage(
        "This browser is not capable of using geolocation. Please type in an address."
      );
      canUseGeolocation = false;
    }
  });

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        getAddressesMatchingLocation(latitude, longitude).then(
          matchingAddresses.set
        );
      },
      (error) => {
        setErrorMessage(error.message);
      }
    );
  }
</script>

<button on:click={getLocation} disabled={!canUseGeolocation}>
  <div class="location-arrow">&#10148;</div>
</button>

<style>
  .location-arrow {
    margin-top: -3px;
    transform: rotateZ(-45deg);
  }
</style>
