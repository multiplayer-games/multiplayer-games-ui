import { RefObject, useEffect, useState } from "react";
import * as PIXI from "pixi.js";

export function useApp(parentRef: RefObject<HTMLElement>) {
  const [app, setApp] = useState<PIXI.Application>();

  useEffect(() => {
    if (!parentRef.current) return;

    const parent = parentRef.current;

    const app = new PIXI.Application({ backgroundColor: 0xeeeeee });
    parent.appendChild(app.view);

    setApp(app);

    return () => {
      parent.removeChild(app.view);
      app.destroy();
    };
  }, [parentRef]);

  return app;
}
