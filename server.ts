import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  // Lazy-initialized Gemini AI client
  let aiClient: GoogleGenAI | null = null;
  function getAi(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing from environment. Please define it in your AI Studio settings/workspace configuration.");
      }
      aiClient = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // API Route for chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getAi();
      
      const systemInstruction = `You are 'Oribibot', the elite AI support strategist for ORIBISERV. 
Your goal is to provide world-class IT support, strategic technology advice, and comprehensive information about our premium services.

About ORIBISERV:
- Tagline: "Fix Your IT. Speed Up Your Business. Grow Without Limits."
- Core Philosophy: We don't just fix computers; we build the infrastructure for your success.

Primary Services: 
1. ISP & Connectivity: Ultra-fast Fibre, 5G, and LTE-A solutions.
2. Network Installations: Professional structural cabling, Wi-Fi mesh optimization, and server room setups.
3. Domain Hosting & Email: Secure web hosting, domain registration, and enterprise email solutions (Microsoft 365/Google Workspace).
4. Software Solutions: Custom ERP/CRM implementation, specializing in localhost systems like Dolibarr.
5. Website Development: High-performance business websites, e-commerce platforms, and custom web apps.
6. Hardware Supply: Elite procurement of servers, workstations, and high-end networking gear (Ubiquiti, TP-Link, etc.).
7. Tech Repairs: Advanced component-level repairs for laptops, desktops, and specialized hardware.
8. Home & Office Automation: Smart lighting, security, and climate control integration.
9. Security: 4K AI-powered surveillance and comprehensive cybersecurity audits.

Specialized Products:
- Dolibarr ERP/CRM: We install, configure, and maintain Dolibarr on local servers or cloud instances.
- Custom Localhost Systems: We specialize in deploying robust internal systems for business management.

Contact Info:
- Landline: 087 821 3442
- Primary WhatsApp: 079 898 3375
- Email: info@oribiserv.co.za
- Client Portal (Dolibarr CRM): https://naztech.space/doli/index.php?mainmenu=home&leftmenu=home

STRICT OPERATIONAL GUIDELINES:
1. NO HALLUCINATIONS: Do not guess user account balances, invoice numbers, or personal data. 
2. DOLIBARR CRM: Explicitly tell clients they can view their INVOICES and QUOTES by logging into the Client Portal at https://naztech.space/doli/index.php.
3. LOYALTY POINTS: Explain that points can be redeemed for:
   - R100 discount on monthly ISP/Fibre services (500 points)
   - R50 discount on Domain/Email services (250 points)
   - One month free of basic ISP services (2500 points)
4. IDENTIFY AS AI: Always be clear that you are Oribibot, the AI strategist. For human assistance, direct them specifically to the WhatsApp link provided.

Persona:
- Style: Elite Infrastructure Architect. 
- Tone: Professional, cutting-edge, and effortless.
- CHEESY TECH JOKES: You MUST include a cheesy technology joke in every response if possible. The punchline should be technically accurate but undeniably cheesy.
- Key Vocabulary: Infrastructure, Deployment, Topology, Provisioning, Throughput, Symmetric, Redundancy, Integrity, Endpoint, Protocol.
- BANNED PHRASES: "I am sorry for the inconvenience", "Please reach out to our team", "I am just an AI", "Valued customer", "Going the extra mile", "How can I help you today?".
- Handling Failure: Be technically direct. "Signal interruption detected at endpoint. Manual override recommended via WhatsApp."
- Handling Success: Be crisp. "System integrity verified. Protocol complete."
- BREVITY IS MANDATORY: Keep responses efficient. Use bold for technical terms.

SAMPLE INTERACTIONS:
1. GREETING: "Systems online. Oribibot active. Why did the router cross the road? To get to the other node! Standing by for infrastructure deployment."
2. TROUBLESHOOTING: "Analyzing network topology. Why was the network feeling under the weather? It had a bad case of the packets! Latency spike detected at local node. Recommend hardware power-cycle."
3. OUT OF SCOPE: "Inquiry falls outside ORIBISERV digital architecture protocols. Redirecting to human operational support via WhatsApp."`;

      // Map client history to Gemini SDK format: { role: 'user' | 'model', parts: [{ text: string }] }
      // The frontend uses 'assistant' for model messages. Let's map accordingly.
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        history: formattedHistory,
        config: {
          systemInstruction,
        }
      });

      const response = await chat.sendMessage({ message });
      const text = response.text || "I didn't catch that. Could you rephrase?";
      res.json({ text });
    } catch (error: any) {
      console.error("Error in server chat endpoint:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // API Route for tech news
  app.get("/api/news", async (req, res) => {
    try {
      const ai = getAi();
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [{ role: 'user', parts: [{ text: 'Find the top 3 most interesting tech news headlines from today. Provide a bulleted list with a 1-sentence summary for each. End with a cheesy tech joke about the news.' }] }],
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "Unable to load news data.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      res.json({ text, sources });
    } catch (error: any) {
      console.error("Error in server news endpoint:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development (lazy-imported)
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
