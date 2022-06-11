import React, { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';

export interface PContainerProps {
  container: PIXI.Container;
  x?: number;
  y?: number;
  children: React.ReactNode;
}

export function PContainer(props: PContainerProps) {
  const [container, setContainer] = useState<PIXI.Container>();

  useEffect(() => {
    const container = new PIXI.Container();
    container.x = props.x ?? 0;
    container.y = props.y ?? 0;

    props.container.addChild(container);

    setContainer(container);

    return () => {
      props.container.removeChild(container);
      container.destroy();
    };
  }, [props.container]);

  const newChildren = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { container });
    }

    return child;
  });

  return <>{container && newChildren}</>;
}
