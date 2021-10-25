<script lang="ts">
  import { DATABASE } from '$lib/service/appwrite/appwrite.config';
  import { Button } from 'sveltestrap';
  import CreateCollection from '$lib/components/collections/CreateCollection.svelte';

  let open = false;
  const toggle = () => (open = !open);
  const promise = DATABASE.listCollections().then((result: any) => {
    console.log(result)
    return result.collections;
  })

  function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };

</script>

<aside>
  <div class="logo"><a href="/">Appwrite database demo</a></div>
  <hr />
  <div class="content">
    <div class="new-collection">
       <Button color="success" on:click={toggle}>+ New collection</Button>
      <p class="title">Collections</p>
    </div>
    {#await promise}
      <p>Loading</p>
    {:then collection}
      <!-- {#if collection} -->
        {#each collection as {$id: id, name}}
          <li><a href="/collection/{id}">
            {truncate(name, 15)}
          </a></li>
        {/each}
      <!-- {/if} -->
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</aside>

<CreateCollection open={open} toggle={toggle}/>

<style>
  aside {
    height: 100%;
    border-right: 1px solid blue;
    background-color: #404040;
    color: #f2f2f2
  }

  .logo {
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding: 0.25rem;
  }

  .title {
    font-size: xx-large;
  }

  .content {
    padding: 1rem;
  }

  .new-collection {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    list-style: none;
    margin-top: 0.35rem;
    width: 100%;
  }

  a {
    text-decoration: none;
    font-size: large;
    font-weight: 700;
    color: #ff0066;
    width: 100%;
    display:inline-block;
  }
</style>