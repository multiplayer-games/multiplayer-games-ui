import { useEffect } from "react";
import * as PIXI from "pixi.js";

export interface PLineProps {
  container: PIXI.Container;
  x1?: number;
  y1?: number;
  x2: number;
  y2: number;
  width?: number;
  color?: number;
}

export function PLine(props: PLineProps) {
  useEffect(() => {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(props.width ?? 1, props.color);
    graphics.moveTo(props.x1 ?? 0, props.y1 ?? 0);
    graphics.lineTo(props.x2, props.y2);
    props.container.addChild(graphics);

    return () => {
      props.container.removeChild(graphics);
      graphics.destroy();
    };
  });

  return null;
}
