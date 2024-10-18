document.getElementById("summarizeBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: getSelectedText
        },
        async (injectionResults) => {
            const [{ result }] = injectionResults;

            console.log("Selected text:", result); // Log the selected text

            if (result) {
                const summary = await summarizeText(result);
                console.log("API Summary:", summary); // Log the summary returned from the API
                document.getElementById("summary").innerText = summary;
            } else {
                document.getElementById("summary").innerText = "No text selected!";
            }
        }
    );
});

// Function to get selected text
function getSelectedText() {
    return window.getSelection().toString();
}

async function summarizeText(text) {
    // Set a safe maximum length based on typical model capabilities
    const maxLength = 1024;

    // Optional: Warn if the input is too long and truncate if desired
    if (text.length > maxLength) {
        console.warn(`Input too long: ${text.length} characters. Truncating to ${maxLength}.`);
        text = text.substring(0, maxLength); // Truncate to a safe maximum length
    }

    const apiKey = 'Secret key hence not to be shared here'; // Replace with your actual API key
    const url = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';

    console.log("Making API request with text:", text); // Log the input text

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: text })
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            const data = await response.json();
            return data[0]?.summary_text || "No summary available.";
        } else {
            const errorData = await response.json();
            console.error("Error response:", JSON.stringify(errorData, null, 2)); // Log the error data in a readable format
            const errorMessage = errorData.error || 'Unknown error occurred. Please try again.';
            return `Error summarizing text: ${errorMessage}`;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return "Network error summarizing text.";
    }
}

