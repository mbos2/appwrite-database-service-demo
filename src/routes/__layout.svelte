<script lang="ts">
  import { Col, Container, Row } from 'sveltestrap';
  import Sidebar from '$lib/components/layout/Sidenav.svelte';
  import '../app.css';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<Container fluid class="full-height">
  <Row  class="full-height">
    <Col lg="2" xl="1" class="full-height">
      <Sidebar />
    </Col>
    <Col class="slot"><slot /></Col>
  </Row>
</Container>

<style>
  .slot {
    padding: 1rem;
  }
</style>