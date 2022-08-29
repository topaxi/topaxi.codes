import { chakra } from "@chakra-ui/react";
import { Link } from "../Link";

export interface TagListProps {
  tags: string[];
}

export function TagList(props: TagListProps): JSX.Element {
  const { tags } = props;

  return (
    <chakra.ul listStyleType="none" display="inline-flex">
      {tags.map((tag) => (
        <chakra.li
          key={tag}
          _notLast={{ _after: { content: "', '", whiteSpace: "pre" } }}
        >
          <Link href={`/tag/${tag}`}>{tag}</Link>
        </chakra.li>
      ))}
    </chakra.ul>
  );
}
