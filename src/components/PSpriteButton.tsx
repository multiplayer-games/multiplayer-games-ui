import { useEffect } from 'react';
import * as PIXI from 'pixi.js';

export interface PSpriteButtonProps {
  container: PIXI.Container;
  name: string;
  onClick: () => void;
  x?: number;
  y?: number;
  frame?: PIXI.Rectangle;
}

export function PSpriteButton(props: PSpriteButtonProps) {
  useEffect(() => {
    const image = new PIXI.BaseTexture(props.name);
    const newImage = new PIXI.Texture(image, props.frame);
    const button = PIXI.Sprite.from(newImage);
    button.x = props.x ?? 0;
    button.y = props.y ?? 0;
    button.buttonMode = true;
    button.interactive = true;
    button.on("pointertap", props.onClick);

    props.container.addChild(button);

    return () => {
      props.container.removeChild(button);
      button.destroy();
    };
  });

  return null;
}
