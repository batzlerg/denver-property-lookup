<script>
  import { coordinates } from "./store";

  $: {
    console.log($coordinates);
  }
</script>

<div>
  {JSON.stringify($coordinates)}
</div>
