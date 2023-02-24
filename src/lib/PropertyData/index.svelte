<script lang="ts">
  import Separator from "./Separator.svelte";
  import type { PropertyData } from "../types";
  export let data: PropertyData;
</script>

{#if data}
  <section class="card">
    <div class="header">
      <h3>{data.address}</h3>
      <span class="header-details">
        <span class="header-detail-value no-wrap">{data.neighborhood}</span>
        <Separator />
        <span class="header-detail-value no-wrap"
          >{data.propertyClass || data.propertyUse}</span
        >
      </span>
    </div>
    <section class="data-section">
      <h4>Details</h4>
      <div class="details">
        <div class="detail-row">
          <span class="no-wrap"
            >{data.bedrooms} Bed, {data.bathrooms} Baths</span
          >
          {#if !!data.finishedAreaSqft}
            <Separator />
            <span class="no-wrap">
              {data.finishedAreaSqft} ft<sup>2</sup>
              <span class="value-type">living</span>
            </span>
          {/if}
          {#if !!data.landAreaSqft}
            <Separator />
            <span class="no-wrap">
              {data.landAreaSqft} ft<sup>2</sup>
              <span class="value-type">lot</span>
            </span>
          {/if}
        </div>
        <div class="detail-row">
          <span class="no-wrap">
            {data.stories}
            {data.stories > 1 ? "Stories" : "Story"}
          </span>
          {#if data?.units > 1}
            <Separator />
            <span class="no-wrap">{data.units} Units</span>
          {/if}
        </div>
        {#if !!data.year}
          <div class="detail-row">
            <span class="no-wrap">Built {data.year}</span>
            {#if !!data.renovatedYear}
              <Separator />
              <span class="no-wrap">
                Renovated
                {data.renovatedYear}
              </span>
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
  .card {
    text-align: left;
    padding: 1rem 2rem;
    border-radius: 10px;
    margin-top: 2rem;
    color: var(--color-white);
    background-color: var(--color-off-black);
  }
  h3,
  h4,
  h5 {
    margin: 0;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-family: var(--font-sans-serif);
  }
  h5 {
    margin: 0.3rem 0;
    font-family: var(--font-sans-serif);
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
    display: flex;
    flex-direction: column;
    place-items: baseline;
    justify-content: space-between;
  }
  .header-details {
    font-size: 0.9rem;
  }
  .header-detail-value,
  .value-type {
    opacity: 0.6;
  }
  .no-wrap {
    white-space: nowrap;
  }
  @media (max-width: 600px) {
    .header {
      flex-direction: column;
    }
    .detail-row {
      display: flex;
      flex-direction: column;
    }
  }
  @media (prefers-color-scheme: light) {
    .card {
      color: var(--color-black);
      background-color: var(--color-white);
    }
  }
</style>
