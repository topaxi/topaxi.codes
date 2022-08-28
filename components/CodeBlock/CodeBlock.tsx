import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import Prism from "prismjs";
import { useMemo } from "react";

export interface CodeBlockProps extends HTMLChakraProps<"pre"> {
  children?: string;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const { children } = props;

  const code = useMemo(() => {
    return Prism.highlight(
      children ?? "",
      Prism.languages.javascript,
      "javascript"
    );
  }, [children]);

  return (
    <chakra.pre borderRadius="sm" {...props}>
      <code dangerouslySetInnerHTML={{ __html: code }} />
    </chakra.pre>
  );
};
