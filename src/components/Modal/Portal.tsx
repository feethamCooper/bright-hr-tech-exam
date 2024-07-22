import { FC, useState, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
  children: ReactNode;
  wrapperId?: string;
}

const Portal: FC<IPortalProps> = ({ children, wrapperId = undefined }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  const createWrapperAndAppendToBody = (
    wrapperId?: string
  ): HTMLElement | null => {
    if (!wrapperId) return null;
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  };

  useLayoutEffect(() => {
    let element = wrapperId ? document.getElementById(wrapperId) : null;
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element !== null && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (typeof window === "undefined") return null;

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

export default Portal;
