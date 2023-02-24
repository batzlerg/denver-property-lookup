<script lang="ts">
  import Separator from "./Separator.svelte";
  import type { PropertyData } from "../lib/types";
  export let data: PropertyData;
</script>

{#if data}
  <section class="card">
    <div class="header">
      <h3>{data.address}</h3>
      <span class="header-details">
        {data.neighborhood}
        <Separator />
        {data.propertyClass || data.propertyUse}
      </span>
    </div>
    <section class="data-section">
      <h4>Details</h4>
      <div class="details">
        <div>
          {data.bedrooms} Bed, {data.bathrooms} Baths
          {#if !!data.finishedAreaSqft}
            <Separator />
            {data.finishedAreaSqft} ft<sup>2</sup>
            <span class="value-type">living</span>
          {/if}
          {#if !!data.landAreaSqft}
            <Separator />
            {data.landAreaSqft} ft<sup>2</sup>
            <span class="value-type">lot</span>
          {/if}
        </div>
        <div>
          {data.stories}
          {data.stories > 1 ? "Stories" : "Story"}
          {#if data?.units > 1}
            <Separator />
            {data.units} Units
          {/if}
        </div>
        {#if !!data.year}
          <div>
            Built {data.year}
            {#if !!data.renovatedYear}
              <Separator />
              {"Renovated"}
              {data.renovatedYear}
            {/if}
          </div>
        {/if}
      </div>
    </section>
    <section class="data-section">
      <h4>Owner</h4>
      <div class="details">
        <div>{data.ownerName}</div>
        <div>{data.ownerAddress}</div>
      </div>
    </section>
    <section class="data-section">
      <h4>Value</h4>
      <div class="details">
        <h5>Property</h5>
        <div>
          ${data.actualTotalValue.toLocaleString()}
          <span class="value-type">Actual</span>
        </div>
        <div>
          ${data.assessedTotalValue.toLocaleString()}
          <span class="value-type">Assessed</span>
        </div>
        {#if data.landAreaSqft}
          <h5>Land</h5>
          <div>
            ${data.actualLandValue.toLocaleString()}
            <span class="value-type">Actual</span>
          </div>
          <div>
            ${data.assessedLandValue.toLocaleString()}
            <span class="value-type">Assessed</span>
          </div>
        {/if}
      </div>
    </section>
  </section>
{/if}

<style>
  section {
    text-align: left;
  }
  h3,
  h4,
  h5 {
    margin: 0;
  }
  h5 {
    margin-bottom: 0.3rem;
  }
  .details h5:not(:first-of-type) {
    margin-top: 1rem;
  }
  .data-section {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
  .header {
    width: 100%;
    display: inline-flex;
    place-items: baseline;
    justify-content: space-between;
    gap: 1rem;
  }
  .value-type {
    opacity: 0.6;
  }
</style>
