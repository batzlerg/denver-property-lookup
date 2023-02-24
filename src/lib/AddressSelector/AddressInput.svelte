<script lang="ts">
  import { matchingAddresses, currentAddress } from "../store";
  import { getAddressesMatchingInput } from "../services/propertyLookupService";
  let timer;
  const searchForMatchingAddress = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const { value } = event.target as HTMLInputElement;
      getAddressesMatchingInput(value.toUpperCase()).then(
        matchingAddresses.set
      );
    }, 750);
  };

  $: addressInputValue = $currentAddress;
</script>

<input
  type="text"
  placeholder="123 N Main St"
  bind:value={addressInputValue}
  on:keyup={(event) => searchForMatchingAddress(event)}
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
