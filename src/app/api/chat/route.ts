import { NextRequest, NextResponse } from 'next/server';

/**
 * AI Chat Endpoint — Dynamic LogisticsNow Assistant
 *
 * Uses Google Gemini API (free tier: 15 RPM, 1M tokens/day) when GEMINI_API_KEY
 * is set in environment. Falls back to an intelligent context-aware system that
 * calls the internal ML models to answer logistics questions dynamically.
 */

const LOGISTICSNOW_CONTEXT = `You are the LogisticsNow AI Assistant, an expert in Indian logistics, freight transportation, and supply chain optimization.

Company Context:
- LogisticsNow (logisticsnow.in) builds the Digital Backbone of Logistics using AI and Data Science
- Core product: LoRRI (Logistics Rate & Route Intelligence) — available at lorri.in (shippers) and transporter.lorri.in (carriers)
- 80,000+ routes mapped, 2,200+ carriers, ₹250 Cr+ logistics spend analysed across 3 continents
- Vision: Building the National Logistics Intelligence Grid
- Services: Freight Benchmarking, Route Intelligence, AI-powered Delay Prediction, Logistics Maturity Assessment
- Contact: connect@logisticsnow.in | +91-9867773508 | Mumbai, India
- Trusted by Fortune 500 companies and leading Indian enterprises

Capabilities on this platform:
- Freight Benchmark Explorer: Compare real-time freight rates across Indian routes
- Delay Prediction: AI predicts delivery delays using weather, traffic, and historical data
- Maturity Assessment: Score your logistics maturity and get optimization suggestions

Be helpful, concise, and professional. When users ask about freight rates or delays, suggest they try the interactive tools on the platform. Always respond in context of Indian logistics.`;

// ─── Internal ML-powered responses (fallback when no LLM API key) ────────────
async function getMLResponse(message: string, baseUrl: string): Promise<string> {
  const lower = message.toLowerCase();

  // Freight rate questions — call the real ML model
  if (lower.includes('rate') || lower.includes('freight') || lower.includes('cost') || lower.includes('price') || lower.includes('benchmark')) {
    // Try to extract cities
    const cities = ['delhi', 'mumbai', 'chennai', 'kolkata', 'bengaluru', 'ahmedabad', 'hyderabad', 'pune', 'jaipur', 'lucknow'];
    const mentioned = cities.filter(c => lower.includes(c));

    if (mentioned.length >= 2) {
      const origin = mentioned[0].charAt(0).toUpperCase() + mentioned[0].slice(1);
      const dest = mentioned[1].charAt(0).toUpperCase() + mentioned[1].slice(1);

      try {
        const res = await fetch(`${baseUrl}/api/predict/freight-rate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ origin, destination: dest, truckType: '32ft MXL' }),
        });
        const data = await res.json();
        if (data.predicted_rate) {
          return `Based on our AI freight model (FreightNet v2.1), here's the rate prediction for **${origin} → ${dest}**:\n\n` +
            `**Predicted Rate:** ₹${data.predicted_rate.toLocaleString()}\n` +
            `**Market Average:** ₹${data.market_avg.toLocaleString()}\n` +
            `**Range:** ₹${data.low.toLocaleString()} — ₹${data.high.toLocaleString()}\n` +
            `**Distance:** ${data.distance_km} km\n` +
            `**Available Carriers:** ${data.carriers}\n\n` +
            `This is for a 32ft MXL truck. Try the **Freight Benchmark Explorer** above to compare different truck types and get detailed analysis!`;
        }
      } catch { /* fall through to general response */ }
    }

    return `Our **Freight Benchmark Explorer** can predict rates across 80,000+ Indian routes using our FreightNet AI model. It factors in:\n\n` +
      `• **Route distance** and toll costs\n• **Truck type** (Container, MXL, Open, Canter, Trailer)\n` +
      `• **Fuel prices** and demand index\n• **Seasonal patterns**\n\n` +
      `Try it out above! Just select origin, destination, and truck type. For enterprise-grade benchmarking across all your lanes, visit [lorri.in](https://lorri.in).`;
  }

  // Delay prediction questions
  if (lower.includes('delay') || lower.includes('late') || lower.includes('on time') || lower.includes('risk') || lower.includes('predict')) {
    const routes = ['delhi → mumbai', 'mumbai → bengaluru', 'delhi → kolkata', 'chennai → hyderabad'];
    const matchedRoute = routes.find(r => {
      const [o, d] = r.split(' → ');
      return lower.includes(o) || lower.includes(d);
    });

    if (matchedRoute) {
      try {
        const res = await fetch(`${baseUrl}/api/predict/delay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ route: matchedRoute.split(' → ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' → '), weather: 'Rain', traffic: 'Moderate' }),
        });
        const data = await res.json();
        if (data.risk_score !== undefined) {
          return `Here's the current delay prediction for **${matchedRoute.split(' → ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' → ')}** (assuming rain + moderate traffic):\n\n` +
            `**Risk Score:** ${data.risk_score}/100 (${data.risk_level})\n` +
            `**Delay Probability:** ${(data.delay_probability * 100).toFixed(1)}%\n` +
            `**Estimated Delay:** ${data.estimated_delay}\n\n` +
            `**Recommendation:** ${data.recommendation}\n\n` +
            `Use the **Predictive Delay Detection** tool above to check different weather and traffic conditions!`;
        }
      } catch { /* fall through */ }
    }

    return `Our **DelayGuard AI** predicts delivery delays in real-time using:\n\n` +
      `• Weather conditions (clear to storm)\n• Traffic congestion levels\n• Historical route performance\n` +
      `• Time of day and day of week\n• Number of congestion zones on route\n\n` +
      `Try the **Predictive Delay Detection** tool above — select a route, weather, and traffic level to get an instant AI prediction!`;
  }

  // Maturity / assessment questions
  if (lower.includes('maturity') || lower.includes('assess') || lower.includes('score') || lower.includes('evaluate')) {
    return `The **Logistics Maturity Assessment** evaluates your operations across multiple dimensions:\n\n` +
      `• **Fleet Efficiency** — size and management capability\n• **Volume Capacity** — shipment throughput\n` +
      `• **Mode Diversity** — FTL, LTL, Rail, Intermodal, Last-mile\n• **Geographic Reach** — regional vs pan-India\n\n` +
      `You'll get a score out of 100, a maturity level (Developing/Intermediate/Advanced), and **personalized AI-powered suggestions** to improve.\n\n` +
      `Try it above — it takes just 30 seconds!`;
  }

  // Company questions
  if (lower.includes('logisticsnow') || lower.includes('company') || lower.includes('about') || lower.includes('who')) {
    return `**LogisticsNow** is building the Digital Backbone of Logistics.\n\n` +
      `We use AI and Data Science to organise the logistics industry — optimizing operations, time, and revenue. ` +
      `As the **trusted, neutral platform**, we serve both shippers and carriers without bias.\n\n` +
      `**Key Numbers:**\n• 80,000+ routes mapped\n• 2,200+ carriers\n• ₹250 Cr+ spend analysed\n• 3 continents covered\n\n` +
      `Our core product **LoRRI** (Logistics Rate & Route Intelligence) is available at [lorri.in](https://lorri.in) for shippers and [transporter.lorri.in](https://transporter.lorri.in) for carriers.`;
  }

  // ROI / savings
  if (lower.includes('roi') || lower.includes('saving') || lower.includes('benefit') || lower.includes('value')) {
    return `LogisticsNow customers typically see:\n\n` +
      `• **12-18% reduction** in freight costs through AI benchmarking\n` +
      `• **34% improvement** in truck utilization\n` +
      `• **40% fewer** late deliveries with predictive delay management\n` +
      `• **₹1.5-4 Cr annual savings** for mid-size shippers (1,000+ monthly shipments)\n\n` +
      `ROI is typically achieved within the **first quarter**. Try the interactive tools above to see personalized estimates for your operations!`;
  }

  // Demo / contact
  if (lower.includes('demo') || lower.includes('contact') || lower.includes('talk') || lower.includes('email') || lower.includes('call')) {
    return `We'd love to help! Here's how to reach us:\n\n` +
      `📧 **Email:** connect@logisticsnow.in\n📞 **Phone:** +91-9867773508 / +91-9653620207\n` +
      `📍 **Office:** 409, Neptune's Flying Colors, Mulund West, Mumbai 400080\n\n` +
      `You can also fill out the **demo request form** in the Contact section below — our team typically responds within 4 hours!`;
  }

  // Industry
  if (lower.includes('industry') || lower.includes('sector') || lower.includes('serve') || lower.includes('customer')) {
    return `We serve enterprises across multiple sectors:\n\n` +
      `🏭 **Manufacturing** — JIT delivery, raw material logistics, vendor management\n` +
      `🛒 **FMCG & Retail** — Distribution network optimization, last-mile efficiency\n` +
      `📦 **E-Commerce** — Fulfillment logistics, return management\n` +
      `🚛 **Logistics Providers** — Carrier management, load optimization, digital transformation\n\n` +
      `Several Fortune 500 companies and leading Indian enterprises use the LogisticsNow platform.`;
  }

  // Default
  return `I can help you with:\n\n` +
    `• **Freight rates** — Ask me about rates between any Indian cities\n` +
    `• **Delay prediction** — Check delay risk for specific routes\n` +
    `• **Logistics maturity** — Assess your operations\n` +
    `• **LogisticsNow platform** — Learn about our AI capabilities\n` +
    `• **ROI & savings** — See potential savings estimates\n` +
    `• **Demo & contact** — Schedule a demo or reach our team\n\n` +
    `Try asking: "What's the freight rate from Delhi to Mumbai?" or "How does AI reduce logistics costs?"`;
}

// ─── Gemini API integration (free tier) ──────────────────────────────────────
async function callGemini(message: string, apiKey: string): Promise<string | null> {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: LOGISTICSNOW_CONTEXT + '\n\nUser question: ' + message }] },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
          topP: 0.9,
        },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'message (string) required' }, { status: 400 });
    }

    const sanitized = message.slice(0, 500).trim();
    const baseUrl = request.nextUrl.origin;

    // Try Gemini API first (if key is configured)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const geminiResponse = await callGemini(sanitized, geminiKey);
      if (geminiResponse) {
        return NextResponse.json({
          reply: geminiResponse,
          model: 'gemini-2.0-flash',
          source: 'llm',
        });
      }
    }

    // Fallback: ML-powered context-aware response
    const reply = await getMLResponse(sanitized, baseUrl);
    return NextResponse.json({
      reply,
      model: 'LogisticsNow Assistant v2.0',
      source: 'ml-context',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
