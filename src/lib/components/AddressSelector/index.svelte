<script lang="ts">
  import { writable } from "svelte/store";
  import AddressInput from "./AddressInput.svelte";
  import LocationInputButton from "./LocationInputButton.svelte";
  import MatchingAddressList from "./MatchingAddressList.svelte";

  let errorMessage = writable<string>();
</script>

<section>
  <div class="address-selector">
    <div class="inputs">
      <AddressInput />
      <LocationInputButton {errorMessage} />
    </div>
    <div class="floating-options">
      <MatchingAddressList />
    </div>
  </div>
  {#if $errorMessage}
    <p class="error-message">{$errorMessage}</p>
  {/if}
</section>

<style>
  .address-selector {
    position: relative;
  }
  .inputs {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  .floating-options {
    width: 100%;
    position: absolute;
    left: 0;
    top: 4rem;
    box-shadow: 1px 1px 5px black;
    border-radius: 10px;
    z-index: 10;
  }
  .error-message {
    color: rgb(199, 0, 0);
    text-shadow: 1px 1px 0 solid black;
  }
</style>
