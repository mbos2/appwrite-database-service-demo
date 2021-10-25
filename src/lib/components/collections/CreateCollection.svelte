<script lang="ts">
  import {NODE_API} from '$lib/service/appwrite/appwrite.node.service';
  import { Rule } from '$lib/models/CollectionRule';
  import { ValidationTypes } from '$lib/models/ValidationTypes'; 
  import {onMount} from 'svelte';
  import Tags from "svelte-tags-input";
  import { Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Form, FormGroup, Input, Label, Image, Tooltip, Table  } from 'sveltestrap';

  export let open;
  export let toggle;

  let subopen = false;
  let ruleValue;
  Rule.subscribe(value => {
    ruleValue = value;
  })
  const addrule = async (event) => {
    event.preventDefault();
    formData.rules = [...formData.rules, ruleValue];
    Rule.set({
      label: '',
      key: '',
      type: '',
      default: '',
      required: false,
      array: false,
      list: []
    });
  }
  let formData = {
    name: '',
    read: [],
    write: [],
    rules: []
  }

  const createCollection = async () => {
    return NODE_API.createCollection(formData.name, formData.read, formData.write, formData.rules);
    // console.log(formData)
  }

  function handleReadPermissions(event) {
    formData.read = event.detail.tags;
  }

  function handlewritePermissions(event) {
    formData.write = event.detail.tags;
  }

  const removeRule = async (i) => {
    formData.rules.splice(i, 1);
    formData.rules = [...formData.rules];
    console.log(formData.rules);
  }

  onMount(async()=> {
    
  })
</script>

  <Modal isOpen={open} {toggle} size="md" backdrop="static">
    <ModalHeader class="dark-blue" {toggle}>Create collection form</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Label class="pink title" for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter collection name"
            bind:value={formData.name}
          />
        </FormGroup>
        <FormGroup>
          <Label class="pink title" for="read">Read permissions</Label>
          <Label class="pink title" for="read" id="tooltip-read"><Image width="28" class="img" alt="Bicycle" src="/static/question-mark.svg" /></Label>
          <Tooltip target={`tooltip-read`}>Divide tags with TAB</Tooltip>
          <Tags
            type="text"
            name="read"
            id="read"
            placeholder="Enter collection read permissions"
            bind:value={formData.read}
            on:tags={handleReadPermissions}
            addKeys={[9]}
            allowBlur={true}
          />
        </FormGroup>
        <FormGroup>
          <Label class="pink title" for="read">Write permissions</Label>
          <Label class="pink title" for="read" id="tooltip-write"><Image width="28" class="img" alt="Bicycle" src="/static/question-mark.svg" /></Label>
          <Tooltip target={`tooltip-write`}>Divide tags with TAB</Tooltip>
          <Tags
            type="text"
            name="write"
            id="write"
            placeholder="Enter collection write permissions"
            bind:value={formData.write}
            on:tags={handlewritePermissions}
            addKeys={[9]}
            allowBlur={true}
          />
        </FormGroup>
        <p class="dark-blue">Rules - {formData.rules.length}</p>
        <hr />
        {#if formData.rules.length > 0}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Label</th>
              <th>Key</th>
              <th>Type</th>
              <th>Default</th>
              <th>Required</th>
              <th>Array</th>    
            </tr>
          </thead>
          <tbody>          
          {#each formData.rules as rule, i}
            <tr>
              <td>
              <Button outline color="danger" on:click={() => {
                event.preventDefault()
                removeRule(i);
              }}
              >X
              </Button>
              </td>
              <td>{rule.label}</td>
              <td>{rule.key}</td>
              <td>{rule.type}</td>
              <td>{rule.default}</td>
              <td>{rule.required}</td>
              <td>{rule.array}</td>
            </tr>
          {/each}
          </tbody>
        </Table>
        <hr />
        {/if}
        <FormGroup>
          <Label class="pink title" for="rule-label">Label</Label>
          <Input
          type="text"
          name="rule-label"
          id="rule-label"
          placeholder="Enter rule label"
          bind:value={$Rule.label}
          />
          <Label class="pink title" for="rule-label">Key</Label>
          <Input
          type="text"
          name="rule-key"
          id="rule-key"
          placeholder="Enter rule key"
          bind:value={$Rule.key}
          />
          <Label class="pink title" for="rule-type">Type</Label>
          <Input type="select" name="rule-type" id="rule-type" bind:value={$Rule.type}>
            <option value="" selected disabled hidden>Choose type</option>
            {#each ValidationTypes as type}
              <option value={type}>{type}</option>
            {/each}
          </Input>
          <Label class="pink title" for="default">Default value</Label>
          <Input type="text" placeholder="Default value" name="default" id="default" bind:value={$Rule.default}/>
          <Label />
          <Input id="c1" type="checkbox" label="Required" bind:checked={$Rule.required}/>
          <Input id="c2" type="checkbox" label="Array" bind:checked={$Rule.array}/>

        </FormGroup>
        <hr />
        <Button color="info" on:click={addrule}>+ Add Rule</Button>
      </Form>
    </ModalBody>    
    <ModalFooter>
      <Button color="primary" on:click={createCollection}>Create</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>



  <style>

  </style>