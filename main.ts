import { Plugin } from "obsidian";

export default class MyPlugin extends Plugin {
	async onload() {
		// Get the list of files in the vault
		const files = this.app.vault.getMarkdownFiles();

		// Iterate through each file in the vault
		for (const file of files) {
			// Load the file contents
			const fileContents = await this.app.vault.read(file);

			// Extract the first 3 lines of the note
			const preview = fileContents
				.split("\n")
				.slice(0, 3)
				.map((line) => line.trim())
				.join(" ");

			console.log("preview", preview);

			// Get the file path element in the sidebar
			const filePathElement = document.querySelector(
				`.nav-file-title[data-path="${file.path}"]`
			);

			console.log("filePathElement", filePathElement);

			// Create a new preview element
			const previewElement = document.createElement("span");
			previewElement.classList.add("nav-file-preview");
			previewElement.textContent = preview;

			console.log("previewElement", previewElement);
			// Add the preview element to the file path element
			if (filePathElement) {
				filePathElement.appendChild(previewElement);
			}
		}
	}

	onunload() {
		console.log("Plugin unloaded");
	}
}
