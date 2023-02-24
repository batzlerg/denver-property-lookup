<script lang="ts">
  import AddressInput from "./AddressInput.svelte";
  import LocationInputButton from "./LocationInputButton.svelte";
  import MatchingAddressList from "./MatchingAddressList.svelte";

  let errorMessage;

  function setErrorMessage(message: string) {
    errorMessage = message;
  }
</script>

<section class="card">
  <div class="address-selector">
    <div class="inputs">
      <AddressInput />
      <LocationInputButton {setErrorMessage} />
    </div>
    <div class="floating-options">
      <MatchingAddressList />
    </div>
  </div>
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
</section>

<style>
  .address-selector {
    position: relative;
  }
  .inputs {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
  .floating-options {
    width: 100%;
    position: absolute;
    left: 0;
    top: 2.5rem;
    background-color: grey;
  }
  .error-message {
    color: red;
  }
</style>
