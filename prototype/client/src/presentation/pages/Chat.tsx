import { Input, Card, Tag } from 'antd'
import { useChat } from '../hooks/useChat'
export default function Chat(){
  // const { mutate: preguntar } = useChat() // presentation -> application/services/ragService -> domain/RagRepository <- infrastructure
  return <div className="bg-white rounded-xl border border-[#e8e0d0] p-4 max-w-[720px]">
    <div className="border-b pb-2 mb-3 text-[12px] font-semibold">Chat — Buffet KM — GPT-4o-mini <span className="text-[#1a7f37]">● En linea</span></div>
    <div className="space-y-3">
      <div className="flex justify-end"><span className="bg-[#c9a86a] text-white px-4 py-2 rounded-full">¿Que falta para audiencia Garcia manana?</span></div>
      <div className="bg-[#fdfbf7] border p-3 rounded-xl">Faltan: certificado nacimiento y informe psicologico.<br/><Tag>Informe Garcia 2024-08-28</Tag></div>
      <div className="flex justify-end"><span className="bg-[#c9a86a] text-white px-4 py-2 rounded-full">¿Y que mas de Mamani?</span></div>
      <div className="bg-[#fdfbf7] border p-3 rounded-xl">Mamani tiene convenio 2024-03-15 homologado. <span className="text-[#8c7348]">[1] Convenio Mamani</span></div>
    </div>
    <div className="flex gap-2 mt-4"><Input placeholder="Pregunta en espanol coloquial..." /><button className="bg-[#c9a86a] text-white px-6 rounded-lg">Enviar</button></div>
  </div>
}
