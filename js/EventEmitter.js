// Classe base con i metodi comuni per controller e view
export class EventEmitter extends EventTarget {
  lanciaEvent(eventName, dettagli = {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: dettagli }));
  }

  on(eventName, handler) {
    this.addEventListener(eventName, handler);
  }
}
