"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body text-sm sm:text-base leading-relaxed sm:leading-loose text-emerald-100 space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => (
            <div className="my-5 overflow-x-auto rounded-2xl border border-emerald-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-emerald-950/60">
              <table className="w-full text-left text-xs sm:text-sm border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-emerald-950/90 border-b border-emerald-500/40 text-emerald-300 font-bold uppercase tracking-wider text-xs sm:text-sm" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-5 py-4 text-emerald-300 font-bold border-r border-emerald-500/20 last:border-r-0" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-5 py-4 border-b border-emerald-500/15 border-r border-emerald-500/10 last:border-r-0 text-emerald-100 hover:bg-emerald-900/30 transition-colors font-normal" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-emerald-300 mt-6 mb-3 pb-2 border-b border-emerald-500/40 tracking-tight" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="font-serif text-lg sm:text-xl font-bold text-emerald-300 mt-5 mb-2.5 pb-1.5 border-b border-emerald-500/30 tracking-tight" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="font-serif text-base sm:text-lg font-bold text-emerald-400 mt-4 mb-2 tracking-tight flex items-center gap-2" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-emerald-200 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-500/40 shadow-sm" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-4 border-l-4 border-emerald-400 bg-emerald-950/80 p-4 sm:p-5 rounded-r-2xl text-emerald-200 shadow-xl italic" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="my-3 space-y-2 pl-6 list-disc marker:text-emerald-400" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="my-3 space-y-2 pl-6 list-decimal marker:text-emerald-400 font-medium" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed text-emerald-100" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="font-mono text-xs sm:text-sm bg-slate-900 text-amber-300 px-2 py-1 rounded-lg border border-amber-500/30" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-5 border-emerald-500/30" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
