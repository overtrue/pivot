import { default as React } from 'react';

interface CodeMirrorEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    height?: string;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
}
export declare const CodeMirrorEditor: React.FC<CodeMirrorEditorProps>;
export {};
