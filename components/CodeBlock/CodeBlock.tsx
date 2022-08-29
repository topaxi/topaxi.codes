import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import Prism from "prismjs";
import { useMemo } from "react";

function getLanguageFromClassName(className: string) {
  if (className == null) {
    return "unknown";
  }

  const [_, language] = /language-(\w+)/.exec(className ?? "") ?? [];

  return language;
}

export interface CodeBlockProps extends HTMLChakraProps<"pre"> {
  children?: string;
}

export const CodeBlock = (props: CodeBlockProps) => {
  const { className, children } = props;

  const language = getLanguageFromClassName(className ?? "");

  const code = useMemo(() => {
    if (!(language in Prism.languages)) {
      return children ?? "";
    }

    return Prism.highlight(children ?? "", Prism.languages[language], language);
  }, [children, language]);

  return (
    <chakra.pre
      borderRadius="sm"
      {...props}
      className={
        className?.includes("language") ? className : `language-unknown`
      }
    >
      <code dangerouslySetInnerHTML={{ __html: code }} />
    </chakra.pre>
  );
};
