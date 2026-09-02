import { useMutation } from '@tanstack/react-query'
import { services } from '../../composition/container'

export const useChat = () =>
  useMutation({ mutationFn: (pregunta: string) => services.rag.preguntar(pregunta) })