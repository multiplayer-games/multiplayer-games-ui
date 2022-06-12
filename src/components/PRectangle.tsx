import { useEffect } from "react";
import * as PIXI from "pixi.js";

export interface PRectangleProps {
  container: PIXI.Container;
  x?: number;
  y?: number;
  width: number;
  height: number;
  lineWidth?: number;
  color?: number;
}

export function PRectangle(props: PRectangleProps) {
  useEffect(() => {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(props.lineWidth ?? 1, props.color);
    graphics.drawRect(props.x ?? 0, props.y ?? 0, props.width, props.height);
    props.container.addChild(graphics);

    return () => {
      props.container.removeChild(graphics);
      graphics.destroy();
    };
  });

  return null;
}
