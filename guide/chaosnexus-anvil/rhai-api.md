---
title: "Rhai Native API Reference"
description: "Documentation for Rhai Native API Reference"
---
# Rhai Native API Reference

ChaosNexus Anvil uses [Rhai](https://rhai.rs/) as its scripting engine. Because Rhai is strictly sandboxed by design, it cannot interact with the operating system, network, or file system on its own. 

To provide agentic capabilities, ChaosNexus Anvil explicitly injects a curated "Native API" into the sandbox using `engine.register_fn`. This allows scripts to perform I/O while ChaosNexus Anvil maintains thread safety and security constraints.

::: warning Concurrency Note
All native functions that access shared state (like globals or databases) are backed by `Arc<Mutex<T>>` or `Arc<RwLock<T>>`. The Rust host explicitly drops lock guards before yielding back to the script to prevent deadlocks.
:::

## Core & Logging

These functions manage script execution state, variables, and internal diagnostics.

* `log_trace(msg: string)` / `log_trace(plugin_name: string, msg: string)`
* `log_debug(msg: string)` / `log_debug(plugin_name: string, msg: string)`
* `log_info(msg: string)` / `log_info(plugin_name: string, msg: string)`
* `log_warn(msg: string)` / `log_warn(plugin_name: string, msg: string)`
* `log_error(msg: string)` / `log_error(plugin_name: string, msg: string)`
  Prints log messages to the engine's output stream.

* `sleep(ms: int)`
  Pauses the current script execution for the specified number of milliseconds.

* `set_global(key: string, value: dynamic)`
  Stores a value in the engine's concurrent global state.
  
* `get_global(key: string) -> dynamic`
  Retrieves a value from the global state.

* `get_cvar(name: string) -> string`
  Reads a Configuration Variable (CVar) from the engine's environment context.

## File System (FS)

Provides safe access to the local file system.

* `read_file_string(path: string) -> string`
  Reads the entire contents of a file into a string.
  
* `write_file_string(path: string, content: string)`
  Writes a string to a file, overwriting it if it exists.
  
* `append_file_string(path: string, content: string)`
  Appends a string to the end of a file.
  
* `delete_file(path: string)`
  Removes a file from the disk.
  
* `list_dir(path: string) -> array`
  Returns an array of file and folder names within a directory.
  
* `exists(path: string) -> bool`
  Returns true if the path exists.
  
* `is_file(path: string) -> bool`
  Returns true if the path points to a file.
  
* `is_dir(path: string) -> bool`
  Returns true if the path points to a directory.

## Shared Data File System

Functions for accessing the shared data folder across plugins (requires capability).

* `fs_data_read(path: string) -> string`
  Reads data from the shared storage.

* `fs_data_write(path: string, content: string)`
  Writes data to the shared storage.

* `fs_data_exists(path: string) -> bool`
  Checks if a file exists in the shared storage.

* `fs_data_list_dir(path: string) -> array`
  Lists the contents of a directory in the shared storage.

* `fs_data_delete(path: string)`
  Deletes a file from the shared storage.

## JSON

Utilities for parsing and serializing JSON data.

* `parse_json(json_str: string) -> map | array`
  Parses a JSON string into a Rhai object map or array.
  
* `to_json(data: dynamic) -> string`
  Serializes a Rhai map or array into a JSON string.

## Network & HTTP

Execute HTTP requests to external services.

* `http_get(url: string) -> string`
  Performs a synchronous HTTP GET request and returns the response body.
  
* `http_post(url: string, body: string) -> string`
  Performs an HTTP POST request with the provided body.
  
* `http_request(method: string, url: string, headers: map, body: string) -> map`
  Performs a fully customizable HTTP request, returning a map containing the `status`, `headers`, and `body`.

* `ws_connect(url: string, callback: string)`
  Connects to a WebSocket server and routes messages to the given callback function.

* `ws_close(url: string)`
  Closes an active WebSocket connection.

* `start_webhook_server(port: int)`
  Starts a local HTTP webhook server on the given port.

* `route_webhook(port: int, path: string, callback: string)`
  Routes incoming webhook POSTs on the given port and path to a specific callback.

## System Execution

Interact with the underlying operating system.

::: danger Security Risk
System execution commands bypass the standard sandbox. Ensure `allow_shell_execution` is properly configured in your `ChaosNexus Anvil.toml` before running untrusted plugins.
:::

* `exec(command: string) -> string`
  Executes a shell command and returns standard output.
  
* `env_get(key: string) -> string`
  Reads an environment variable from the host operating system.

## Cryptography

Basic cryptographic utilities for hashing and encoding.

* `base64_encode(text: string) -> string`
* `base64_decode(text: string) -> string`
* `md5(text: string) -> string`
* `sha256(text: string) -> string`

## Database Connections

Connect to structured data stores directly from Rhai plugins.

* `db_connect(id: string, url: string)`
  Initializes a connection pool for a SQL database with a specific URL.

* `db_connect(id: string)`
  Initializes an ambient connection using the DATABASE_URL environment variable.

* `db_execute(id: string, sql: string, params: array) -> int`
  Executes a SQL query that modifies data and returns the number of rows affected.

* `db_query(id: string, sql: string, params: array) -> array`
  Executes a SQL SELECT query and returns the results as an array of JSON objects.
  Initializes a connection pool for a SQL database.
  
* `skytable_connect() -> SkytableHandle`
  Connects to a Skytable instance based on environment variables.
  
* `redis_connect() -> RedisHandle`
  Connects to a Redis instance based on environment variables.

## MCP Protocol Control

Manage the Model Context Protocol lifecycle natively.

* `register_mcp_tool(tool_name: string, desc: string, schema_json: string)`
  Registers a tool with the MCP server.

* `register_mcp_resource(resource_name: string, uri: string, desc: string)`
  Registers a resource with the MCP server.

* `register_mcp_prompt(prompt_name: string, desc: string, args_json: string)`
  Registers a prompt with the MCP server.
