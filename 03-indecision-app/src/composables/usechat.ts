
import { ref } from 'vue'
import type { ChatMessage } from '@/interface/chat-message.interface'
import { sleep } from '@/helpers/sleep'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])

  const onMessage = async (text: string) => {
    if (text.trim().length === 0) return

    
    messages.value.push({
      id: new Date().getTime(),
      itsMine: true,
      message: text,
    })

    if (!text.trim().endsWith('?')) return

    
    await sleep(1)

    
    const randomAnswer = Math.random() < 0.5 ? 'bien' : 'enfermo ' 

    
    messages.value.push({
      id: new Date().getTime(),
      itsMine: false,
      message: randomAnswer,
    })
  }

  return {
    messages,
    onMessage,
  }
}

//aca esta el si y no de si la persona ingrea un signo de interro
