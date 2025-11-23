import React from 'react';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import { TranslationType } from '../translations';

interface AiResultProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  response: string;
  t: TranslationType;
}

export const AiResult: React.FC<AiResultProps> = ({ isOpen, onClose, query, response, t }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-zinc-800">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-zinc-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-900">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-500 dark:text-indigo-400" size={20} />
            <h3 className="font-semibold text-gray-800 dark:text-zinc-100">{t.aiResultTitle}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 bg-white/50 dark:bg-zinc-800/50 p-1.5 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-all">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar bg-white dark:bg-zinc-900">
          <div className="mb-6">
            <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium mb-2">{t.yourQuery}</p>
            <p className="text-gray-800 dark:text-zinc-100 bg-gray-50 dark:bg-black p-4 rounded-xl border border-gray-100 dark:border-zinc-800">{query}</p>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">{t.response}</p>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors bg-gray-50 dark:bg-zinc-800 px-2 py-1 rounded-md"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-black/20 flex justify-end">
           <button 
             onClick={onClose}
             className="px-5 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm text-gray-600 dark:text-zinc-200 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors font-medium shadow-sm"
           >
             {t.close}
           </button>
        </div>
      </div>
    </div>
  );
};