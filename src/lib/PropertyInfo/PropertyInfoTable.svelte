<script lang="ts">
  export let header: string;
  export let rows: [string, string | number][];
  export let subTable: boolean = false;
</script>

{#if subTable}
  <details>
    <summary>{header}</summary>
    <table>
      {#each rows as [label, value]}
        <tr>
          <td class="label">{label}</td>
          <td class="value">{value}</td>
        </tr>
      {/each}
    </table>
  </details>
{:else}
  <table>
    <caption>{header}</caption>
    {#each rows as [label, value]}
      <tr>
        <td class="label">{label}</td>
        <td class="value">{value}</td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  caption,
  summary {
    width: 100%;
    text-align: left;
    font-weight: bold;
    text-transform: capitalize;
  }
  table {
    text-align: left;
    width: 100%;
  }
  .label {
    width: 30%;
  }
</style>
