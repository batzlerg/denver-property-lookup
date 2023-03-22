<script lang="ts">
  import { onMount } from "svelte";
  import {
    matchingAddresses,
    currentAddress,
    propertyCache,
    errorMatchingAddress,
  } from "../../store";
  import { getAddressesMatchingLocation } from "../../services/mapsService";
  import { getPropertyData } from "../../services/propertyLookupService";
  import Loader from "./Loader.svelte";
  import type { Writable } from "svelte/store";
  import { loadingInitiator, InputSources } from "./store";

  export let errorMessage: Writable<string>;
  let canUseGeolocation = true;
  $: isLoading = $loadingInitiator === InputSources.GPS;

  onMount(() => {
    if (!navigator.geolocation) {
      errorMessage.set(
        "This browser is not capable of using geolocation. Please type in an address."
      );
      canUseGeolocation = false;
    }
  });

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        loadingInitiator.set(InputSources.GPS);
        getAddressesMatchingLocation(latitude, longitude)
          .then((addresses) => {
            errorMessage.set(null);
            matchingAddresses.set(addresses);
          })
          .catch((err) => {
            errorMessage.set(err?.message || "Something went wrong.");
          })
          .finally(() => {
            loadingInitiator.set(null);
          });
      },
      () => {
        errorMessage.set(
          "Location access denied. Refresh and try again, or enter an address manually."
        );
      }
    );
  }
</script>

<button on:click={getLocation} disabled={!canUseGeolocation || isLoading}>
  {#if isLoading}
    <Loader />
  {:else}
    <div class="location-arrow">&#10148;</div>
  {/if}
</button>

<style>
  .location-arrow {
    margin: 0;
    padding: 0;
    margin-top: -5px;
    margin-left: 1px;
    transform: rotateZ(-45deg);
    font-size: 1.5rem;
    font-weight: 500;
    font-family: inherit;
  }

  button {
    border-radius: 10px;
    border: none;
    padding: 0;
    background-color: var(--color-accent);
    transition: border-color 0.25s;
    flex-shrink: 0;
    height: 3rem;
    width: 3rem;
  }

  button:not(:disabled) {
    cursor: pointer;
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    button {
      color: var(--color-white);
    }
  }
</style>
