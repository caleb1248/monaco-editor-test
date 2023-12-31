import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import darkPlus from "./darkplustheme";

self.MonacoEnvironment = {
  getWorker: function (_moduleId: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const editorDiv = document.body.appendChild(document.createElement("div"));
editorDiv.id = "editor";

monaco.editor.defineTheme("dark", darkPlus);

const model = monaco.editor.createModel(
  "console.log('hello world')",
  undefined,
  new monaco.Uri().with({ path: "app.js" })
);

const editor = monaco.editor.create(editorDiv, {
  language: "typescript",
  theme: "dark",
  model: model,
});
