export class GeminiService {
  public async startChat(): Promise<void> {
    // Handled dynamically per request on the server to preserve state robustness
  }

  public async sendMessage(message: string, history: any[] = []): Promise<string> {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });

      if (!response.ok) {
        throw new Error("HTTP connection signal failure");
      }

      const data = await response.json();
      return data.text || "Protocol complete. Signal processed, but response text empty.";
    } catch (error) {
      console.error("Error sending message to Gemini API proxy:", error);
      return "I'm having trouble connecting to Oribibot command node right now. Why did the router go to counseling? It had too many connection issues! Please try again in a moment.";
    }
  }

  public async getTechNews(): Promise<{ text: string; sources: any[] }> {
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        throw new Error("HTTP connection signal failure loading news");
      }

      const data = await response.json();
      return { 
        text: data.text || "Unable to load news streams.", 
        sources: data.sources || [] 
      };
    } catch (error) {
      console.error("Error fetching tech news from API proxy:", error);
      return { 
        text: "Could not fetch the latest tech news at this moment. Why did the computer keep sneezing? It had too many windows open! Please check back later.", 
        sources: [] 
      };
    }
  }
}

export const geminiService = new GeminiService();
