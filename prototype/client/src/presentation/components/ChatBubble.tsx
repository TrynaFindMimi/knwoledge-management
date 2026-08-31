export const ChatBubble = ({ mine, text, citas }: { mine:boolean, text:string, citas?:string[] }) => (
  <div className={`max-w-[420px] p-3 rounded-xl ${mine ? 'bg-[#c9a86a] text-white ml-auto' : 'bg-[#fdfbf7] border text-[#1a1a1a]'}`}>
    <div className="text-[13px]">{text}</div>
    {citas && <div className="flex gap-1 mt-2">{citas.map(c=><span key={c} className="text-[10px] bg-white border rounded-full px-2 py-1">{c}</span>)}</div>}
  </div>
)
