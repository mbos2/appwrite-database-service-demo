<script>
  import { Button, Modal } from 'sveltestrap';
  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<main class="full-height">
  <slot></slot>
</main>

<style>

</style>