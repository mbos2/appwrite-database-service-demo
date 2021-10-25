<script lang="ts">
  import {NODE_API} from '$lib/service/appwrite/appwrite.node.service';
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from 'sveltestrap';
  export let open = false;
  export let collectionId;
  export let toggle;
  let jsonData = {};

  const getCollection = async () => {
    NODE_API.getCollection(collectionId);
  }

  const createDocument = async () => {
    NODE_API.createDocument();
  }

</script>

<Modal isOpen={open} {toggle} backdrop="static">
    <ModalHeader {toggle}>Modal title</ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>Create</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>
