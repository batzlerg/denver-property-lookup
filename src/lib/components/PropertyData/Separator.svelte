<script lang="ts">
  export let showXS = false;
</script>

<span class={showXS ? "" : "show-xs"}>&ensp;|&ensp;</span>

<style>
  span {
    color: var(--color-dark-gray);
  }

  @media (max-width: 600px) {
    span.show-xs {
      display: none;
    }
  }

  @media (prefers-color-scheme: light) {
    span {
      color: var(--color-light-gray);
    }
  }
</style>
