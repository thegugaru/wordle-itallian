const on = (eventType: any, listener: any) => {
  document.addEventListener(eventType, listener);
}

const off = (eventType: any, listener: any) => {
  document.removeEventListener(eventType, listener);
}

const once = (eventType: any, listener: any) => {
  const handleEventOnce = (event: any) => {
    listener(event);
    off(eventType, handleEventOnce);
  }

  on(eventType, handleEventOnce);
}

const trigger = (eventType: any, data?: any) => {
  const event = new CustomEvent(eventType, { detail: data });
  document.dispatchEvent(event);
}

export { on, once, off, trigger };
