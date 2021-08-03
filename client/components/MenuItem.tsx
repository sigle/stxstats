// https://medium.com/the-coders-guide-to-javascript/smooth-scrolling-anchor-menu-in-reactjs-175030d0bce2
import { useState, useEffect } from "react";
import { Box } from "../src/ui/Box";

/*
 * A single menu item
 * I deconstruct props to provide more readable code, allowing
 * any future coders to see exactly what props are expected
 */
export const MenuItem = ({
  itemName,
  active,
}: {
  itemName: string;
  active: boolean;
}) => {
  /*
   * Store our anchorTarget in state
   * We do not set it here, preferring to wait for after the component
   * is mounted to avoid any errors
   */
  const [anchorTarget, setAnchorTarget] = useState<HTMLElement | null>(null);

  /*
   * When the component mounts and/or updates, set our AnchorTarget based
   * on the itemName
   */
  useEffect(() => {
    setAnchorTarget(document.getElementById(itemName));
  }, [itemName]);

  /*
   * Where all the magic happens -- scrollIntoView on click
   */
  const handleClick = (event: any) => {
    event.preventDefault();
    anchorTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let name = "";
  switch (itemName) {
    case "number-of-txs":
      name = "Number of transactions";
      break;
    case "unique-addresses":
      name = "Unique addresses";
      break;
    case "transactions-fee":
      name = "Transaction Fees";
      break;
    default:
      throw new Error(`Unknown item ${itemName}`);
  }

  /*
   * Return the MenuItem as JSX
   * Remember to set your ariaLabel for accessability!
   */
  return (
    <Box as={"li"} css={{ py: "$4" }}>
      <Box
        as={"a"}
        css={{
          textDecoration: "none",
          color: "$gray12",
          "&.active": {
            // TODO change this color var
            color: "var(--green-color)",
            fontWeight: 700,
          },
        }}
        href={`#${itemName}`}
        onClick={handleClick}
        className={active ? "active" : ""}
        aria-label={`Scroll to ${itemName}`}
      >
        {name}
      </Box>
    </Box>
  );
};
