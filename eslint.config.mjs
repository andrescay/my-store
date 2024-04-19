import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"},

},
{rules: {
  "no-console":["warn", { allow: ["warn", "error"] }] // Advierte cuando se utiliza console.log()
}
},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];
