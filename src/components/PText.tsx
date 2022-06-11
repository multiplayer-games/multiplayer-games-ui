import { useEffect } from 'react';
import * as PIXI from 'pixi.js';

export interface PTextProps {
  container: PIXI.Container;
  value: string;
  style?: Partial<PIXI.ITextStyle>;
  x?: number;
  y?: number;
}

export function PText(props: PTextProps) {
  useEffect(() => {
    const text = new PIXI.Text(props.value, props.style);
    text.x = props.x ?? 0;
    text.y = props.y ?? 0;

    props.container.addChild(text);

    return () => {
      props.container.removeChild(text);
      text.destroy();
    };
  });

  return null;
}
