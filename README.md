# GitHub Action: Config Blanks

This action helps create dynamic configuration files during workflow.
JSON in key-value format is passed to the action input.
The key is the path to the file or directory.
The value can be both text and object.
An object in value is only supported for file formats such as YAML and JSON.
To create a file in YAML format, the file must have the extension `.yml` or `.yaml`.
Under other conditions, a JSON file is created from the object or list.
If the content is `null`, the file is not created.
To create a directory, the key must end with a slash. And content is not taken into account.

```yml
- uses: levonet/action-config-blanks@master
  with:
    source: '{"a/b.txt":"a\nb","c/d.yml":{"a":{"b":"text"}},".tmp/":null}'
# Create:
#   a/b.txt  with plain text content
#   c/d.yml  in YAML format
#   .tmp     directory
```

## Inputs

### `source`

**Required** A JSON key-value object.
Where as the key is the file or directory name, and the value as the content of the file.
The name of the directory must end in a slash (content value is ignored).
If the content is `null`, the file is not created.

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
