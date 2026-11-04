"use client";

import { Code2 } from "lucide-react";
import {
    Code,
    CodeBlock,
    CodeHeader,
} from "./animate-ui/components/animate/code";

export const CodeDemo = ({ duration, delay, writing, cursor }) => {
    return (
        <Code
            key={`${duration}-${delay}-${writing}-${cursor}`}
            className="w-full sm:w-110 h-120 border-none"
            code={`import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('HTTP Error! status: response.status');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]); // Re-run effect if URL or options change

  return { data, loading, error };
};

export default useFetch;'
`}
        >
            <CodeHeader icon={Code2} copyButton>
                use-fetch.jsx
            </CodeHeader>

            <CodeBlock
                cursor={cursor}
                lang="jsx"
                writing={writing}
                duration={duration}
                delay={delay}
            />
        </Code>
    );
};
