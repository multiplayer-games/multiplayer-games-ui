import { useEffect } from "react";
import * as PIXI from 'pixi.js';

export interface PTextButtonProps {
  container: PIXI.Container;
  text: string;
  onClick: () => void;
  x?: number;
  y?: number;
  style?: Partial<PIXI.ITextStyle>;
  paddingX?: number;
  paddingY?: number;
}

const defaultStyle: Partial<PIXI.ITextStyle> = {
  fontSize: 16,
};

const defaultPadding = 4;

export function PTextButton(props: PTextButtonProps) {
  useEffect(() => {
    const wrapper = new PIXI.Container();
    wrapper.x = props.x ?? 0;
    wrapper.y = props.y ?? 0;
    wrapper.buttonMode = true;
    wrapper.interactive = true;

    props.container.addChild(wrapper);

    const text = new PIXI.Text(props.text, { ...defaultStyle, ...props.style });
    text.x = props.paddingX ?? defaultPadding;
    wrapper.addChild(text);

    const rect = new PIXI.Graphics();
    rect.lineStyle(2, 0x333333, 1);
    rect.beginFill(0xEEEEEE);
    rect.drawRect(0, 0, text.width + (props.paddingX ?? defaultPadding) * 2, text.height);
    wrapper.addChildAt(rect, 0);

    wrapper.on("pointerover", () => {
      text.style.fill = "red";
    });

    wrapper.on("pointerout", () => {
      text.style.fill = "black";
    });

    wrapper.on("pointertap", props.onClick);

    return () => {
      props.container.removeChild(wrapper);
    };
  });

  return null;
}
