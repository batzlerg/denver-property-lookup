<script lang="ts">
  import PropertyInfoTable from "./PropertyInfoTable.svelte";
  import { propertyCache } from "../store";
  import type { PropertyData } from "../types";

  export let address: string;
  let rows: [string, string | number][] = [];
  let specialCases: Record<string, [string, string | number][]> = {};
  let data: PropertyData;

  $: {
    data = $propertyCache[address];
    console.log(data);

    if (data) {
      rows = [];
      specialCases = {};
      for (const [key, value] of Object.entries(data)) {
        if (["number", "string"].includes(typeof value)) {
          // todo: remove after typing propertyCache
          rows.push([key, value as string | number]);
        } else {
          specialCases[key] = Object.entries(value);
        }
      }
    }
  }
</script>

<section>
  <PropertyInfoTable header={address} {rows} />
  {#each Object.entries(specialCases) as [label, value]}
    <PropertyInfoTable subTable header={label} rows={value} />
  {/each}
</section>
