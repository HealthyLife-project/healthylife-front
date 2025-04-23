import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      new URLSearchParams({
        auth_key: process.env.DEEPL_KEY!,
        text,
        target_lang: targetLang.toUpperCase(),
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const translatedText = response.data.translations[0].text;
    res.status(200).json({ result: translatedText });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
}
