"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Highlight, Prism, themes } from "prism-react-renderer";

let prismLanguagesLoaded = false;

interface CodeEditorProps {
  code: string;
  language: "cpp" | "python" | "java";
  languageLabel: string;
  fileName?: string;
}

const editorTheme = {
  ...themes.oneDark,
  plain: {
    ...themes.oneDark.plain,
    backgroundColor: "transparent",
  },
  styles: [
    ...(themes.oneDark.styles ?? []),
    // Gentle purple accents to match the app.
    {
      types: ["function", "class-name"],
      style: { color: "rgb(200, 180, 255)" },
    },
    {
      types: ["keyword"],
      style: { color: "rgb(141, 118, 233)" },
    },
  ],
};

export function CodeEditor({
  code,
  language,
  languageLabel,
  fileName,
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [isHighlightReady, setIsHighlightReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadLanguages() {
      if (prismLanguagesLoaded) {
        if (!cancelled) setIsHighlightReady(true);
        return;
      }

      // prismjs language components expect a global Prism.
      (globalThis as unknown as { Prism?: unknown }).Prism = Prism;

      // Load dependencies first (cpp/java depend on clike).
      await import("prismjs/components/prism-clike");
      await import("prismjs/components/prism-cpp");
      await import("prismjs/components/prism-java");
      await import("prismjs/components/prism-python");

      prismLanguagesLoaded = true;
      if (!cancelled) setIsHighlightReady(true);
    }

    void loadLanguages();
    return () => {
      cancelled = true;
    };
  }, []);

  const normalizedCode = useMemo(() => {
    // Prism tokenization is nicer without trailing newlines.
    return code.replace(/\n$/, "");
  }, [code]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Ignore; clipboard may be unavailable.
    }
  }, [code]);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "rgba(var(--background), 0.35)",
        border: "1px solid rgba(var(--foreground), 0.10)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          backgroundColor: "rgba(var(--foreground), 0.03)",
          borderBottom: "1px solid rgba(var(--foreground), 0.10)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "rgba(255,95,86,0.95)" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "rgba(255,189,46,0.95)" }}
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "rgba(39,201,63,0.95)" }}
            />
          </div>

          <div className="min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                opacity: 0.9,
              }}
              title={fileName ?? undefined}
            >
              {fileName ?? "Algorithm"}
            </p>
            <p className="text-xs" style={{ opacity: 0.6 }}>
              {languageLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition"
          style={{
            backgroundColor: "rgba(var(--foreground), 0.05)",
            border: "1px solid rgba(var(--foreground), 0.10)",
          }}
        >
          {copied ? (
            <>
              <Check
                className="w-4 h-4"
                style={{ color: "rgb(141,118,233)" }}
              />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" style={{ opacity: 0.75 }} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Body */}
      <div className="max-h-[520px] overflow-auto">
        <div className="min-w-[720px]">
          {normalizedCode.trim().length === 0 ? (
            <div className="p-6 text-sm" style={{ opacity: 0.7 }}>
              No code yet.
            </div>
          ) : (
            <Highlight
              theme={editorTheme}
              code={normalizedCode}
              language={isHighlightReady ? language : "plain"}
            >
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre
                  className="py-4 text-sm leading-6 whitespace-pre"
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    color: "rgba(var(--foreground), 0.88)",
                  }}
                >
                  {tokens.map((line, idx) => {
                    const lineProps = getLineProps({ line });

                    return (
                      <div
                        key={idx}
                        {...lineProps}
                        className="grid"
                        style={{
                          gridTemplateColumns: "4.25rem 1fr",
                        }}
                      >
                        <span
                          className="pr-3 text-right text-xs select-none"
                          style={{
                            opacity: 0.45,
                            backgroundColor: "rgba(var(--foreground), 0.02)",
                            borderRight:
                              "1px solid rgba(var(--foreground), 0.08)",
                            paddingTop: idx === 0 ? 0 : undefined,
                          }}
                        >
                          {idx + 1}
                        </span>

                        <span className="pl-4 pr-6">
                          {line.map((token, tokenIdx) => (
                            <span
                              key={tokenIdx}
                              {...getTokenProps({ token })}
                            />
                          ))}
                        </span>
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          )}
        </div>
      </div>
    </div>
  );
}
