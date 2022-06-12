import { useEffect } from "react";
import * as PIXI from "pixi.js";

export interface PImageButtonProps {
  container: PIXI.Container;
  imageUrl: string;
  onClick: () => void;
  x?: number;
  y?: number;
}

export function PImageButton(props: PImageButtonProps) {
  useEffect(() => {
    let isOver = false;
    let isDown = false;

    const textureNormal = PIXI.Texture.from(`/assets/${props.imageUrl}.png`);
    const textureOver = PIXI.Texture.from(`/assets/${props.imageUrl}_over.png`);
    const textureDown = PIXI.Texture.from(`/assets/${props.imageUrl}_down.png`);

    const button = new PIXI.Sprite(textureNormal);
    button.x = props.x ?? 0;
    button.y = props.y ?? 0;
    button.buttonMode = true;
    button.interactive = true;
    button.on("pointertap", props.onClick);
    button.on("pointerover", onButtonOver);
    button.on("pointerout", onButtonOut);
    button.on("pointerdown", onButtonDown);
    button.on("pointerup", onButtonUp);
    button.on("pointerupoutside", onButtonUp);

    props.container.addChild(button);

    function onButtonOver() {
      isOver = true;

      if (isDown) {
        return;
      }

      button.texture = textureOver;
    }

    function onButtonOut() {
      isOver = false;

      if (isDown) {
        return;
      }

      button.texture = textureNormal;
    }

    function onButtonDown() {
      isDown = true;
      button.texture = textureDown;
    }

    function onButtonUp() {
      isDown = false;

      if (isOver) {
        button.texture = textureOver;
      } else {
        button.texture = textureNormal;
      }
    }

    return () => {
      props.container.removeChild(button);
      button.destroy();
    };
  });

  return null;
}
