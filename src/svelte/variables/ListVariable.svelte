<script>
  const variables = [
    {
      key: '{first_name}',
      description: 'name of the recipient',
      providers: [
        'Linkedin', 
        'Facebook', 
        'Gmail'
      ]
    },
    {
      key: '{full_name}',
      description: 'full name of the recipient',
      providers: [
        'Linkedin', 
        'Facebook', 
        'Gmail'
      ]
    }
  ];
</script>

<ul>
{#each variables as item}
  <li><b>{ item.key }</b> - { item.description } ({ item.providers })</li>
{/each}
</ul>