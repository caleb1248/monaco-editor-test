import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
  getWorker: function (workerId: string, label: string) {
    const getWorkerModule = (moduleUrl: string, label: string): Worker => {
      // @ts-ignore
      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
        name: label,
        type: 'module',
      });
    };

    switch (label) {
      case 'json':
        return getWorkerModule(
          '/monaco-editor/esm/vs/language/json/json.worker?worker',
          label
        );
      case 'css':
      case 'scss':
      case 'less':
        return getWorkerModule(
          '/monaco-editor/esm/vs/language/css/css.worker?worker',
          label
        );
      case 'html':
      case 'handlebars':
      case 'razor':
        return getWorkerModule(
          '/monaco-editor/esm/vs/language/html/html.worker?worker',
          label
        );
      case 'typescript':
      case 'javascript':
        return getWorkerModule(
          '/monaco-editor/esm/vs/language/typescript/ts.worker?worker',
          label
        );
      default:
        return getWorkerModule(
          '/monaco-editor/esm/vs/editor/editor.worker?worker',
          label
        );
    }
  },
};
const editorDiv = document.body.appendChild(document.createElement('div'));

const model = monaco.editor.createModel(
  'console.log("hello world")',
  undefined,
  monaco.Uri.parse('file://code/index.ts')
);
const editor = monaco.editor.create(editorDiv, {
  language: 'typescript',
  theme: 'vs-dark',
});
editor.setModel(model);
