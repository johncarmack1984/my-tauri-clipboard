import reactLogo from "./assets/react.svg";
import "./App.css";
import { CopyButton } from "./copy-button";
import { useEffect, useState } from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { readText } from "@tauri-apps/plugin-clipboard-manager";
function App() {
  const [copyText] = useState("Copy this text");
  const [pasteText, setPasteText] = useState("");

  const isPasteTextCopied = copyText === pasteText;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const read = async () => {
      const text = await readText();
      // setPasteText(text);
      console.log("paste text changed, clipboard content: ", text);
    };
    read();
  }, [pasteText]);

  return (
    <main className="container flex flex-col gap-2 items-start justify-start">
      <div className="flex gap-2 items-start justify-center">
        <input
          className="h-full"
          id="greet-input"
          value={copyText}
          disabled={true}
        />
        <CopyButton value={copyText} />
      </div>
      <div className="flex gap-2">
        <input
          placeholder="Paste here"
          onChange={(e) => setPasteText(e.currentTarget.value)}
        />
        {isPasteTextCopied ? <CheckIcon /> : <ClipboardIcon />}
      </div>
    </main>
  );
}

export default App;
