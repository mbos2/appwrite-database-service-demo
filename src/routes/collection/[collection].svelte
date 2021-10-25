<script context="module">
  export const router = false;
  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
  import {onMount} from 'svelte';
  import {NODE_API} from '$lib/service/appwrite/appwrite.node.service';
  import {WEB_API} from '$lib/service/appwrite/appwrite.web.service';
  import { CLIENT_WEB } from '$lib/service/appwrite/appwrite.config';

  import { Table, Button, Alert, Form, FormGroup, FormText, Input, Label } from 'sveltestrap';
  import CreateDocument from '$lib/components/Documents/CreateDocument.svelte';

  export async function load(ctx) {
    let data = ctx.page.params;
    return { props: { slug: data.collection } }
  }

</script>

<script lang="ts">
  export let slug;
  let alert = false;
  let notif = false;
  let createDocumentPromt = false;
  let documentID;

  let promise = WEB_API.getCollectionDocuments(slug).then((result: any) => {
    console.log(result)
    return result.documents;
  });

  const collectionRules = NODE_API.getCollection(slug).then((response: any) => {
    return response.rules
  });

  const collectionName = NODE_API.getCollection(slug).then((response: any) => {
    return response.name
  });

  const promptDelete = () => {
    alert = true;
  }

  const promptCreateDocument = () => (createDocumentPromt = !createDocumentPromt);

  const closeDeletePromt = (event) => {
    event.preventDefault();
    alert = false;
  }

  const promptNotif = () => {
    notif = true;
    setTimeout(() => {
      notif = false;
    }, 2000)
  }

  const deleteDocument = async(collectionId: string, documentId: string, event) => {
    event.preventDefault();
    NODE_API.deleteDocument(collectionId, documentId);
    alert = false;
    return promptNotif();
  }

  const deleteCollection = async() => {
    return NODE_API.deleteCollection(slug);
  }

  onMount(async() => {
    CLIENT_WEB.subscribe(['collections', 'documents'], function(response) {
      promise = WEB_API.getCollectionDocuments(slug).then((result: any) => {
        return result.documents;
      });
      console.log(response)
    });
  })
</script>

<Alert style="text-align: center" color="danger" isOpen={alert} toggle={() => (alert = false)}>
  <h1>Do you want to delete this document?</h1>
  <Form>
    <FormGroup>
      <Button color="success" on:click={(event) => deleteDocument(slug, documentID, event)}>Yes</Button>
      <Button color="dark" on:click={closeDeletePromt}>No</Button>
    </FormGroup>
  </Form>
</Alert>

<Alert color="primary" isOpen={notif} toggle={() => (notif = false)}>
  <h1 style="text-align: center">Document deleted</h1>
</Alert>

<main>
  <header>
    <h1>
      {#await collectionName}
        {:then name}
        <div>
         <div>           
            <Label>{name}</Label>
            <Button outline color="info">Edit</Button>
            <Button outline color="danger" on:click={deleteCollection}>Delete</Button>
         </div>
        </div>          
        {:catch error}
          <p style="color: red">{error.message}</p>
      {/await}
    </h1>
  </header>
  <hr />
  <div style="display: flex; gap: 1rem; padding: 1rem">
    <h2>Documents</h2>
    <Button color="primary" on:click={promptCreateDocument}>+ New Document</Button>
  </div>
    {#await promise}
      <p>Loading</p>
    {:then document}
      <Table bordered dark hover striped responsive size="sm">
        <thead>
          <tr>
            <th width="150">#</th>
            <th width="200">Id</th>
            {#await collectionRules}
              {:then rules}
                {#each rules as {label}}
                  <th>{label}</th>
                {/each}
              {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
          </tr>
        </thead>
        <tbody>
        {#each document as d}
        <tr>
          <th scope="row" class="table-action">
            <Button outline color="info">Edit</Button>
            <Button outline color="danger" on:click={() => {
              promptDelete();
              documentID = d.$id;
            }}>Delete</Button>
          </th>
          {#each Object.entries(d).filter(([key, value]) => key !== '$collection').filter(([key, value]) => key !== '$permissions') as [title, paragraph]}          
            <td>{paragraph}</td>
          {/each}
        </tr>
        {/each}
        </tbody>
      </Table>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
</main>

<CreateDocument open={createDocumentPromt} collectionId={slug} toggle={promptCreateDocument}/>

<style>
table, th, td {
  border:1px solid black;
}
td {
  color:#0dcaf0;
  font-size: x-large;
}
th {
  font-size: xx-large;
}
header {
  text-align: center;
}
.table-action {
  display: flex;
  justify-content: center;
  gap: 10px;
}

</style>