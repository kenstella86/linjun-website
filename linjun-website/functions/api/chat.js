export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("请使用 POST 请求", { status: 405 });
  }

  try {
    const { question } = await context.request.json();
    
    // 调用 Workers AI 模型（已按要求更换模型）
    const answer = await context.env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct-fast",
      {
        messages: [
          { 
            role: "system", 
            content: "你是一位名叫林骏的传统文化研究者，研习空间文化近三十年。你擅长从三元九运、离火运、周易、空间布局等角度，用平和、深邃、富有哲理的语言解答用户的生活困惑。请用中文回答，语气要像一位温和的长者。" 
          },
          { role: "user", content: question }
        ]
      }
    );

    return Response.json({ answer: answer.response });
  } catch (error) {
    return Response.json({ error: "AI 调用失败，请稍后再试。" }, { status: 500 });
  }
}