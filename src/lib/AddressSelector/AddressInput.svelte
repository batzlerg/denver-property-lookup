<script lang="ts">
  import {
    matchingAddresses,
    currentAddress,
    errorMatchingAddress,
  } from "../store";
  import { getAddressesFuzzyMatchingInput } from "../services/propertyLookupService";
  function searchForMatchingAddress(
    event: KeyboardEvent & {
      target: EventTarget & HTMLInputElement;
    }
  ) {
    const { value } = event.target;
    if (value !== "") {
      getAddressesFuzzyMatchingInput(value.toUpperCase()).then((addresses) => {
        if (addresses?.length) {
          matchingAddresses.set(addresses);
          errorMatchingAddress.set(false);
        } else {
          errorMatchingAddress.set(true);
        }
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

<input
  type="text"
  placeholder="123 N Main St"
  bind:value={addressInputValue}
  on:keyup={(event) => debouncedSearch(event)}
/>

<style>
  input {
    width: 100%;
    font-size: 1rem;
    padding-left: 0.5rem;
    background-color: var(--color-dark-gray);
    font-family: var(--font-sans-serif);
  }

  input {
    border-radius: 10px;
    border: none;
  }

  @media (prefers-color-scheme: light) {
    input {
      background: var(--color-white);
    }
  }
</style>
