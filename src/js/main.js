import { loadComponent } from "./providers/components.js";
import { settings }     from "./settings.js";

window.addEventListener("load", () => {
  settings.load.components.forEach(c => {
    loadComponent(c);
  });
});
