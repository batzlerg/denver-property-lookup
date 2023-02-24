<script lang="ts">
  import { onMount } from "svelte";
  import {
    matchingAddresses,
    currentAddress,
    propertyCache,
    errorMatchingAddress,
  } from "../store";
  import { getAddressesMatchingLocation } from "../services/mapsService";
  import { getPropertyData } from "../services/propertyLookupService";
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
        getAddressesMatchingLocation(latitude, longitude).then((addresses) => {
          setErrorMessage(null);
          // if we have one address, skip the suggestion and go straight to lookup
          if (addresses.length === 1) {
            const address = addresses[0];
            if (!$propertyCache[address]) {
              getPropertyData(address)
                .then((data) => {
                  propertyCache.update((cache) => ({
                    ...cache,
                    [address]: data,
                  }));
                  currentAddress.set(address);
                  matchingAddresses.set([]);
                  errorMatchingAddress.set(false);
                })
                .catch(() => {
                  errorMatchingAddress.set(true);
                });
            } else {
              currentAddress.set(address);
              matchingAddresses.set([]);
            }
          } else {
            matchingAddresses.set(addresses);
          }
        });
      },
      () => {
        setErrorMessage(
          "Geolocation access denied. Please refresh and try again, or enter an address manually."
        );
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

  button {
    border-radius: 10px;
    border: none;
    padding: 0.6em 0.7em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--color-accent);
    cursor: pointer;
    transition: border-color 0.25s;
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
