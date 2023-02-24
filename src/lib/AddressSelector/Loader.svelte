<script lang="ts">
  export let dark: boolean = false;
</script>

<div class="wrapper">
  <div class="loader center"><span class={dark ? "dark" : ""} /></div>
</div>

<style>
  /* Loader 1 */
  /* lifted from https://codepen.io/nobuakihonma/pen/dYbqLQ */
  *,
  ::after,
  ::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .wrapper {
    --size: 1.5rem;
    --time: 1.2s;

    display: block;

    position: relative;
    width: var(--size);
    height: var(--size);
    margin: 0 auto;
  }
  .center {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .loader {
    height: var(--size);
    width: var(--size);
    -webkit-animation: loader-1 calc(var(--time) * 4) linear infinite;
    animation: loader-1 calc(var(--time) * 4) linear infinite;
  }
  @keyframes loader-1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loader span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: var(--size);
    width: var(--size);
    clip: rect(0, var(--size), var(--size), calc(var(--size) / 2));
    -webkit-animation: loader-2 var(--time) linear infinite;
    animation: loader-2 var(--time) linear infinite;
  }
  @keyframes loader-2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(220deg);
    }
  }
  .loader span::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: var(--size);
    width: var(--size);
    clip: rect(0, var(--size), var(--size), calc(var(--size) / 2));
    border: 2px solid var(--color-white);
    border-radius: 50%;
    -webkit-animation: loader-3 var(--time) cubic-bezier(0.77, 0, 0.175, 1)
      infinite;
    animation: loader-3 var(--time) cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
  .loader span.dark::after {
    border: 2px solid var(--color-light-gray);
  }
  @-webkit-keyframes loader-3 {
    0% {
      -webkit-transform: rotate(-140deg);
    }
    50% {
      -webkit-transform: rotate(-160deg);
    }
    100% {
      -webkit-transform: rotate(140deg);
    }
  }
  @keyframes loader-3 {
    0% {
      transform: rotate(-140deg);
    }
    50% {
      transform: rotate(-160deg);
    }
    100% {
      transform: rotate(140deg);
    }
  }
</style>
