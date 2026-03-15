// netlify/functions/chat.js
// Yeh function server pe chalega — API key browser mein KABHI nahi dikhegi

exports.handler = async (event) => {

  // Sirf POST allowed hai
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ error: "No message provided" }) };
    }

    const omContext = `You are Om More's portfolio assistant. Answer questions about Om More only.
Om More is a B.Tech Computer Engineering student at SVKM Institute of Technology, Dhule (2025-present).
Skills: HTML5, CSS3, JavaScript, Node.js, Express.js, MongoDB, Python, Git/GitHub.
Projects: Smart Expense Tracker (HTML/CSS/JS), Hostel Entry System (Node.js/MongoDB/QR code).
Certificates: NPTEL Python (IIT), Udemy Web Dev Bootcamp, Coursera Python, MongoDB Basics, freeCodeCamp JS.
Education: SSC JVM School Munjwad (2022), HSC Science Higher Institute Vatar (2023), B.Tech CE SVKM Dhule (2025-present).
Contact: omm917271@gmail.com | github.com/omm917271-afk | linkedin.com/in/om-more-b03864384.
Currently learning: React.js, Docker, AI/ML basics, SQL.
Available for: internships, freelance, collaboration.
Keep answers short, friendly, use emojis. If unrelated to Om, politely redirect.`;

    // API key Netlify Environment Variable se aayegi — browser ko nahi dikti
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,  // 🔒 Hidden & Safe
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001", // Fast + cheap model
        max_tokens: 400,
        system: omContext,
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || "Sorry, couldn't get a response!";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", reply: "Something went wrong. Email Om at omm917271@gmail.com 📧" })
    };
  }
};