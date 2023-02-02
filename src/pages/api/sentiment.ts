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

export type Status = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised' | 'fearful' | 'disgusted' | 'calm' | 'confused' | 'bored' | 'excited' | 'loved' | 'frustrated'

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
      inputs: [`${req.body}`],
      examples: [
        { text: 'I’m feeling good: Me siento bien.', label: 'happy' },
        { text: 'I’m feeling happy: Me siento feliz.', label: 'happy' },
        { text: 'I’m feeling great: Me siento genial.', label: 'happy' },
        { text: 'I’m feeling wonderful: Me siento maravilloso.', label: 'happy' },
        { text: 'I’m feeling cheerful: Me siento alegre.', label: 'happy' },
        { text: 'I’m feeling delighted: Me siento encantado.', label: 'happy' },
        { text: 'I’m feeling overjoyed: Me siento muy contento.', label: 'happy' },
        { text: ':)', label: 'happy' },
        { text: '😀, 😃, 🙂, 😊, 😊, 😄', label: 'happy' },

        { text: 'I’m really bummed out!: ¡Estoy muy molesto!.', label: 'sad' },
        { text: 'I’m feeling miserable: Me siento muy triste.', label: 'sad' },
        { text: 'I’m feeling kind of down: Estoy de bajón.', label: 'sad' },
        { text: 'I just want to be alone for a while: Quiero estar solo un rato.', label: 'sad' },
        { text: 'I’m feeling bad: Me siento mal.', label: 'sad' },
        { text: 'I’m feeling sad: Me siento triste.', label: 'sad' },
        { text: 'I’m feeling depressed: Me siento deprimido.', label: 'sad' },
        { text: '😢, 😭, 😞, 😔, 😟', label: 'sad' },

        { text: 'I’m feeling angry: Me siento enojado.', label: 'angry' },
        { text: 'I’m feeling annoyed: Me siento molesto.', label: 'angry' },
        { text: 'I’m feeling irritated: Me siento irritado.', label: 'angry' },
        { text: 'I’m in a foul mood: Estoy de muy mal humor.', label: 'angry' },
        { text: '😠, 😡, 👿', label: 'angry' },

        { text: 'I’m feeling neutral: Me siento neutral.', label: 'neutral' },
        { text: 'I’m feeling okay: Me siento bien.', label: 'neutral' },
        { text: 'ok, okay, alright, fine', label: 'neutral' },
        { text: '👌, 😐, 😑, 😶', label: 'neutral' },

        { text: 'I’m feeling surprised: Me siento sorprendido.', label: 'surprised' },
        { text: 'I’m feeling shocked: Me siento asombrado.', label: 'surprised' },
        { text: 'I’m feeling astonished: Me siento asombrado.', label: 'surprised' },
        { text: 'I’m feeling amazed: Me siento asombrado.', label: 'surprised' },
        { text: 'WOW!: ¡Vaya!, LOL, OMG', label: 'excited' },
        { text: '😮, 😲, 😳, 😵, 😱', label: 'surprised' },

        { text: 'I’m feeling fearful: Me siento asustado.', label: 'fearful' },
        { text: 'I’m feeling scared: Me siento asustado.', label: 'fearful' },
        { text: 'I’m feeling terrified: Me siento aterrorizado.', label: 'fearful' },
        { text: 'I’m feeling petrified: Me siento petrificado.', label: 'fearful' },
        { text: '😲, 😨, 😰, 😱, 😖, ', label: 'fearful' },

        { text: 'I’m feeling disgusted: Me siento disgustado.', label: 'disgusted' },
        { text: 'I’m feeling repulsed: Me siento repelido.', label: 'disgusted' },
        { text: 'I’m feeling nauseated: Me siento nauseado.', label: 'disgusted' },
        { text: 'I’m feeling sick: Me siento enfermo.', label: 'disgusted' },
        { text: '😷, 😵, 😖, 😫, 😩, 😤, 💩', label: 'disgusted' },

        { text: 'I’m feeling calm: Me siento tranquilo.', label: 'calm' },
        { text: 'I’m feeling relaxed: Me siento relajado.', label: 'calm' },
        { text: 'I’m feeling at ease: Me siento a gusto.', label: 'calm' },
        { text: 'I’m feeling content: Me siento contento.', label: 'calm' },
        { text: 'I’m feeling peaceful: Me siento en paz.', label: 'calm' },
        { text: 'I’m feeling serene: Me siento sereno.', label: 'calm' },
        { text: '😌, 😏, 😄, 😊, 😅, 😄', label: 'calm' },

        { text: 'How are you?: ¿Cómo estás?', label: 'confused' },
        { text: 'I’m feeling confused: Me siento confundido.', label: 'confused' },
        { text: 'How are you doing?: ¿Qué tal estás?', label: 'confused' },
        { text: 'What’s up?: ¿Qué pasa?', label: 'confused' },
        { text: 'What’s going on?: ¿Qué está pasando?', label: 'confused' },
        { text: 'What’s new?: ¿Qué hay de nuevo?', label: 'confused' },
        { text: 'idk: no sé', label: 'confused' },
        { text: '😕, 😵, 🤔', label: 'confused' },

        { text: 'I’m feeling bored: Me siento aburrido.', label: 'bored' },
        { text: 'I’m feeling tired: Me siento cansado.', label: 'bored' },
        { text: 'I’m feeling sleepy: Me siento somnoliento.', label: 'bored' },
        { text: '😴, 😪, 😴, 😴, 😴', label: 'bored' },

        { text: 'I’m feeling excited: Me siento emocionado.', label: 'excited' },
        { text: 'I’m feeling ecstatic: Me siento eufórico.', label: 'excited' },
        { text: 'I’m feeling thrilled: Me siento emocionado.', label: 'excited' },
        { text: 'KEKW, XD, LOL, LMAO, ROFL, LULW, OMEGALUL', label: 'excited' },
        { text: '🤣, 😁, 😄, 😆, 😎', label: 'excited' },

        { text: 'I’m feeling loved: Me siento amado.', label: 'loved' },
        { text: 'I’m feeling cherished: Me siento querido.', label: 'loved' },
        { text: 'I’m feeling adored: Me siento adorado.', label: 'loved' },
        { text: 'XOXO, <3, ❤️, 💕, 💖, 💗, 💘, 💙, 💚, 💛, 💜, 💝, 💞, 💟', label: 'loved' },
        { text: '😍, 😘, 😚, 😗, 😙, 😚', label: 'loved' },

        { text: 'I’m feeling frustrated: Me siento frustrado.', label: 'frustrated' },
        { text: 'I’m fed up with this: ¡Estoy harto de esto!', label: 'frustrated' },
        { text: 'I just can’t cope with this: No puedo con esto.', label: 'frustrated' },
        { text: 'I’m feeling annoyed: Me siento molesto.', label: 'frustrated' },
        { text: '🤦‍♀️, 🤦‍♂️, 😣, 😩, 😰', label: 'frustrated' },
      ],
      truncate: 'END',
      outputIndicator: 'Clasifica estos comentarios de una transmision en directo',
      taskDescription: 'Clasifica estos comentarios de acuerdo a su sentimiento y al lenguaje en el que están escritos.',
    })
  }).then(async (response) => {
    const data: Sentiment = await response.json()
    res.status(200).json(data)
  }).catch(error => {
    console.log(error)
  })
}
