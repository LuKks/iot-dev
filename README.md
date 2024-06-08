# iot-dev

Development tooling for ESP-IDF

```
npm i -g iot-dev
```

Depends on:

- `idf.py` The CLI itself won't be used actually
- `esptool.py`

## Usage

```sh
iot-dev [command] [options]

Commands:
  init                       create a new project
  configure [options]        set up the build environment
  build [options]            compile the project
  flash [options] [build]    write a firmware to device
  elf_hash [options] <file>  read the ELF hash from a binary
  help [command]             display help for command
```

## License

MIT
