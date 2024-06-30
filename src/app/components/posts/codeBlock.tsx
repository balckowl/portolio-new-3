import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps =  {
    value?: string;
    language?: string;
}

export const CodeBlock = ({ value = '', language = 'javascript' }: CodeBlockProps) => {
    return (
        <SyntaxHighlighter language={language} style={oneLight}>
            {value}
        </SyntaxHighlighter>
    );
};
