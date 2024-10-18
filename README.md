# Text Summarizer Extension

## Description
The **Text Summarizer** is a web browser extension, (this one was used for Edge)  that allows users to easily summarize selected text from any webpage. Utilizing the Hugging Face API, this extension provides quick and accurate summaries, enhancing productivity and comprehension.

## Features
- **Summarize Selected Text**: Highlight any text on a webpage and click the summarize button to get a concise summary.
- **User-Friendly Interface**: Simple and intuitive design that integrates seamlessly with your browser.
- **API Integration**: Leverages the Hugging Face model for high-quality text summarization.

## Installation
1. Clone this repository or download the ZIP file.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** at the top right.
4. Click on **Load unpacked** and select the folder where you have the extension files.
5. The extension should now appear in your list of extensions.

## Usage
1. Navigate to any webpage.
2. Select the text you want to summarize.
3. Click the extension icon to open the popup.
4. Click the **Summarize** button to see the summary of the selected text.

## API Key
This extension uses the Hugging Face API for summarization. You need to replace the API key in `popup.js` with your own for it to work:
```javascript
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
