import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

function normalizeMarkdown(md: string) {
    return md.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    p: ({ children, ...props }) => (
                        <p className="my-1 leading-relaxed text-sm" {...props}>
                            {children}
                        </p>
                    ),
                }}
            >
                {normalizeMarkdown(content)}
            </ReactMarkdown>
        </div>
    );
}
