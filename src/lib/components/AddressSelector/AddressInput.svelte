<script lang="ts">
  import {
    matchingAddresses,
    currentAddress,
    errorMatchingAddress,
  } from "../../store";
  import { getAddressesFuzzyMatchingInput } from "../../services/propertyLookupService";
  import Loader from "./Loader.svelte";
  import { InputSources, loadingInitiator } from "./store";

  $: isLoading = $loadingInitiator === InputSources.MANUAL;

  function searchForMatchingAddress(
    event: KeyboardEvent & {
      target: EventTarget & HTMLInputElement;
    }
  ) {
    const { value } = event.target;
    if (value !== "") {
      loadingInitiator.set(InputSources.MANUAL);
      getAddressesFuzzyMatchingInput(value.toUpperCase()).then((addresses) => {
        if (addresses?.length) {
          matchingAddresses.set(addresses);
          errorMatchingAddress.set(false);
        } else {
          errorMatchingAddress.set(true);
        }
        loadingInitiator.set(null);
      });
    }
  }
  let timer: NodeJS.Timeout;
  const debouncedSearch = (event) => {
    clearTimeout(timer);
    if (event.key === "Enter" || event.keyCode === 13) {
      searchForMatchingAddress(event);
    }
    timer = setTimeout(() => {
      searchForMatchingAddress(event);
    }, 750);
  };

  $: addressInputValue = $currentAddress;
</script>

<div class="address-input">
  <input
    type="text"
    placeholder="123 N Main St"
    disabled={!!$loadingInitiator}
    bind:value={addressInputValue}
    on:keyup={(event) => debouncedSearch(event)}
  />
  {#if isLoading}
    <div class="loader-wrapper">
      <Loader dark={true} />
    </div>
  {/if}
</div>

<style>
  .address-input {
    width: 100%;
    display: inline-flex;
    min-height: 100%;
    position: relative;
  }

  input {
    width: 100%;
    font-size: 1rem;
    padding-left: 1rem;
    background-color: var(--color-dark-gray);
    font-family: var(--font-sans-serif);
    border-radius: 10px;
    border: none;
  }

  .loader-wrapper {
    position: absolute;
    right: 1rem;
    top: 25%;
  }

  @media (prefers-color-scheme: light) {
    input {
      background: var(--color-white);
    }
  }
</style>
