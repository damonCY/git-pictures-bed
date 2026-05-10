# git-pictures-bed

A practical image hosting tool built on top of GitHub repositories.

`git-pictures-bed` provides two upload workflows:

- a CLI command for uploading local images
- a local web uploader for drag-and-drop style usage

Uploaded files are pushed to a GitHub repository and can then be accessed through raw GitHub URLs.

## Installation

```bash
npm install -g git-pictures-bed
```

## CLI

```bash
pb -h
```

```text
Usage: pb [options]

Options:
  -V, --version      output the version number
  -p, --path <path>  upload a file from a local path
  --init <git>       initialize with a Git repository URL
  --update           update the tool version
  --server           start the local upload service
  -h, --help         output usage information
```

## Quick Start

### 1. Create an empty GitHub repository

Create a repository that will be used to store uploaded images.

### 2. Initialize the tool

```bash
pb --init git@github.com:your-name/your-image-repo.git
```

This step stores local configuration and prepares the target repository.

### 3. Upload an image from the command line

```bash
pb --path "/absolute/path/to/example.png"
```

### 4. Start the local upload service

```bash
pb --server
```

This starts a local web interface for uploading images from the browser.

## How it works

The tool clones the target repository locally, copies uploaded files into the repository, commits the changes, and pushes them back to GitHub. After upload, the image can be referenced through the raw GitHub content URL.

## Project Structure

- `bin/` — CLI entry and command handling
- `src/` — upload logic and local configuration handling
- `server/` — local upload service
- `client/` — front-end assets for the local uploader

## Use Case

This project is useful for people who want a lightweight personal image bed based on GitHub instead of a separate storage service.
