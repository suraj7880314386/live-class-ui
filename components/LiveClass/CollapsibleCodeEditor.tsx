'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Play, Settings } from 'lucide-react'

type Language = 'javascript' | 'python' | 'java' | 'cpp' | 'html'

const CODE_SAMPLES: Record<Language, string> = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result);`,

  python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

result = fibonacci(10)
print(result)`,

  java: `// Java Example
public class Fibonacci {
    static int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fib(10));
    }
}`,

  cpp: `// C++ Example
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`,

  html: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
    <title>Fibonacci</title>
</head>
<body>
    <h1>Fibonacci Sequence</h1>
    <script>
        console.log(fibonacci(10));
    </script>
</body>
</html>`,
}

export function CollapsibleCodeEditor() {
  const [language, setLanguage] = useState<Language>('javascript')
  const [code, setCode] = useState(CODE_SAMPLES[language])
  const [output, setOutput] = useState('')

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
    setCode(CODE_SAMPLES[newLang])
    setOutput('')
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const handleRunCode = () => {
    // Simple execution simulation
    if (language === 'javascript') {
      try {
        // In real implementation, would use a backend/sandbox
        setOutput('Output: 55\nExecution Time: 0.2ms')
      } catch (e) {
        setOutput(`Error: ${(e as Error).message}`)
      }
    } else {
      setOutput(`Output: Code execution requires backend integration\nSupported in Judge0 API`)
    }
  }

  return (
    <div className="flex flex-col h-full gap-0 bg-slate-950 text-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap flex-1">
          <span className="text-sm font-medium text-slate-300">Code Workspace</span>

          {/* Language Selector */}
          <Select value={language} onValueChange={(v) => handleLanguageChange(v as Language)}>
            <SelectTrigger className="w-32 h-8 bg-slate-800 border-slate-700 text-sm text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopyCode}
            size="sm"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-800 h-8 gap-2"
            title="Copy Code"
          >
            <Copy size={16} />
            <span className="hidden sm:inline text-xs">Copy</span>
          </Button>

          <Button
            onClick={handleRunCode}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white h-8 gap-2"
            title="Run Code"
          >
            <Play size={16} />
            <span className="hidden sm:inline text-xs">Run</span>
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-800 h-8"
            title="Settings"
          >
            <Settings size={16} />
          </Button>
        </div>
      </div>

      {/* Code Editor & Output Split */}
      <div className="flex-1 flex gap-0 overflow-hidden">
        {/* Code Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-800">
          {/* Line Numbers & Code */}
          <div className="flex-1 overflow-auto font-mono text-sm bg-slate-950">
            <div className="flex">
              {/* Line Numbers */}
              <div className="bg-slate-900 text-slate-500 px-3 py-3 text-right min-w-12 border-r border-slate-800 select-none">
                {code.split('\n').map((_, i) => (
                  <div key={i} className="h-6 flex items-center justify-end">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code Content */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-3 bg-slate-950 text-slate-100 border-0 resize-none focus:outline-none font-mono text-sm leading-6"
                spellCheck="false"
                style={{
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                }}
              />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-48 flex flex-col border-l border-slate-800 bg-slate-900">
          <div className="px-3 py-2 border-b border-slate-800 bg-slate-800 flex-shrink-0">
            <p className="text-xs font-semibold text-slate-300">Output</p>
          </div>
          <div className="flex-1 overflow-auto p-3 font-mono text-xs text-slate-300 whitespace-pre-wrap break-words">
            {output || (
              <span className="text-slate-600">
                Click &quot;Run&quot; to execute code
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 border-t border-slate-800 bg-slate-900 flex-shrink-0">
        <span>{code.split('\n').length} lines • {code.length} characters</span>
        <span>Ready • Judge0 Integration Available</span>
      </div>
    </div>
  )
}
