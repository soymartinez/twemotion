// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export interface Sentiment {
  id: string
  classifications: {
    id: string
    input: string
    prediction: Status
    confidence: number
    confidences: {
      option: Status
      confidence: number
    }[]
    labels: {
      negative: number
      neutral: number
      positive: number
    }
  }[]
}

export type Status = 'negative' | 'positive' | 'neutral'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') res.status(405).json({ message: 'Method not allowed' })

  await fetch('https://api.cohere.ai/classify', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.COHERE_API_KEY}`
    },
    body: JSON.stringify({
      inputs: [
        'This item was broken when it arrived',
        'The product is amazing',
        'The product was not too bad',
        'Ahora que lo dices, sí que es verdad que el juego es muy aburrido',
        '¡Gracias por el consejo! Voy a probarlo',
        'Me alegro de que te esté gustando',
        'Espero que lo soluciones pronto',
        'Vete a la mierda, no me hables más',
        'Te pones a hablar de cosas que no sabes',
        'No me gusta que me digas eso',
        'Acaso eres eres un imbécil',
      ],
      examples: [
        { text: 'The order came 5 days early', label: 'positive' },
        { text: 'The item exceeded my expectations', label: 'positive' },
        { text: 'I ordered more for my friends', label: 'positive' },
        { text: 'I would buy this again', label: 'positive' },
        { text: 'I would recommend this to others', label: 'positive' },
        { text: 'The package was damaged', label: 'negative' },
        { text: 'The order is 5 days late', label: 'negative' },
        { text: 'The order was incorrect', label: 'negative' },
        { text: 'I want to return my item', label: 'negative' },
        { text: 'The item\'s material feels low quality', label: 'negative' },
        { text: 'The product was okay', label: 'neutral' },
        { text: 'I received five items in total', label: 'neutral' },
        { text: 'I bought it from the website', label: 'neutral' },
        { text: 'I used the product this morning', label: 'neutral' },
        { text: 'The product arrived yesterday', label: 'neutral' },
        { text: '¡Genial directo! Me estás sacando muchas dudas', label: 'positive' },
        { text: 'Este juego es increíble, me estoy divirtiendo mucho', label: 'positive' },
        { text: 'Me encanta tu contenido, siempre aprendo algo nuevo', label: 'positive' },
        { text: 'Este juego es muy aburrido, no entiendo por qué es tan popular', label: 'negative' },
        { text: 'No estoy de acuerdo con lo que dices, creo que estás equivocado', label: 'negative' },
        { text: 'Este directo es muy lento, no pasa nada interesante', label: 'negative' },
        { text: 'No estoy seguro de lo que pienso de este juego todavía', label: 'neutral' },
        { text: 'Gracias por compartir tu experiencia, estoy interesado en escuchar más', label: 'neutral' },
        { text: 'No estoy muy familiarizado con este tema, pero estoy aprendiendo', label: 'neutral' },
      ],
      truncate: 'END',
      outputIndicator: 'Clasifica estos comentarios de un directo',
      taskDescription: 'Clasifica estos comentarios como positivos, negativos o neutros en el idioma en el que están escritos'
    })
  }).then(async (response) => {
    const data: Sentiment = await response.json()
    res.status(200).json(data)
  }).catch(error => {
    console.log(error)
  })
}
