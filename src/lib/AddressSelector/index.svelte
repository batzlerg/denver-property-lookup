<script lang="ts">
  import AddressInput from "./AddressInput.svelte";
  import LocationInputButton from "./LocationInputButton.svelte";
  import MatchingAddressList from "./MatchingAddressList.svelte";

  let errorMessage;

  function setErrorMessage(message: string) {
    errorMessage = message;
  }
</script>

<section>
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
    top: 3rem;
    box-shadow: 1px 1px 5px black;
    border-radius: 10px;
    z-index: 10;
  }
  .error-message {
    color: rgb(199, 0, 0);
    text-shadow: 1px 1px 0 solid black;
  }
  /* @media (prefers-color-scheme: light) {
    .error-message {
      color: darkred;
    }
  } */
</style>
