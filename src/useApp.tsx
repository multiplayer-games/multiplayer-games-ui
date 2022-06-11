import { useEffect, useState } from "react";
import * as PIXI from 'pixi.js';

export function useApp() {
  const [app, setApp] = useState<PIXI.Application>();

  useEffect(() => {
    const app = new PIXI.Application({ backgroundColor: 0xEEEEEE });
    document.body.appendChild(app.view);

    setApp(app);

    return () => {
      document.body.removeChild(app.view);
      app.destroy();
    };
  }, []);

  return app;
}
