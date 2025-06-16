"use client";

import React from "react";
import { Flex } from "@/once-ui/components/Flex";

// This component wraps the Flex component and fixes the "text-align" issue
// by overriding the style prop to use "textAlign" instead of "text-align"
const FixedFlex = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Flex>>((props, ref) => {
  // Extract the align prop and style from props
  const { align, style, ...rest } = props;

  // Create a new style object with textAlign instead of text-align
  const fixedStyle = {
    ...style,
    // Only add textAlign if align is provided
    ...(align && { textAlign: align }),
  };

  // Create a new props object without the align prop
  // This ensures that the align prop is not passed to the Flex component
  // which would cause it to use "text-align" in the style object
  const { align: _, ...restWithoutAlign } = rest;

  // Return the Flex component with the fixed style and without the align prop
  return <Flex ref={ref} style={fixedStyle} {...restWithoutAlign} />;
});

FixedFlex.displayName = "FixedFlex";

export { FixedFlex };
