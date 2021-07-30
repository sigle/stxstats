// https://medium.com/the-coders-guide-to-javascript/smooth-scrolling-anchor-menu-in-reactjs-175030d0bce2
import { useState, useEffect } from "react";
import { Box } from "../src/ui/Box";

/*
 * We will include our MenuItem Component
 */
import { MenuItem } from "./MenuItem";

/*
 * The list of our Menu Titles (Sections) as keys, with their
 * Y-pixel position on the page as the values
 * 'Top' generically references the top of the page
 */
const menuItems: { [key: string]: any } = {
  "number-of-txs": null,
  "unique-addresses": null,
};

/*
 * Our menu component
 */
export const Menu = () => {
  /*
   * Store the active menuItem in state to force update
   * when changed
   */
  const [activeItem, setActiveItem] = useState("Top");

  /*
   * The MutationObserver allows us to watch for a few different
   * events, including page resizing when new elements might be
   * added to the page (potentially changing the location of our
   * anchor points)
   * We also listen to the scroll event in order to update based
   * on our user's scroll depth
   */
  useEffect(() => {
    const observer = new MutationObserver(getAnchorPoints);
    observer.observe(document.getElementById("__next")!, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("scroll", handleScroll);
  }, []);

  /*
   * Programmatically determine where to set AnchorPoints for our Menu
   */
  const getAnchorPoints = () => {
    const curScroll = window.scrollY - 100;
    for (const key in menuItems) {
      menuItems[key] =
        document.getElementById(key)!.getBoundingClientRect().top + curScroll;
    }
    handleScroll();
  };

  /*
   * Determine which section the user is viewing, based on their scroll-depth
   * Locating the active section allows us to update our MenuItems to show which
   * item is currently active
   */
  const handleScroll = () => {
    const curPos = window.scrollY;
    let curSection = null;
    /*
     * Iterate through our sections object to find which section matches with
     * the current scrollDepth of the user.
     * NOTE: This code assumes that the sections object is built with an 'ordered'
     * list of sections, with the lowest depth (top) section first and greatest
     * depth (bottom) section last
     * If your items are out-of-order, this code will not function correctly
     */
    for (const section in menuItems) {
      curSection = menuItems[section] <= curPos ? section : curSection;
      if (curSection !== section) {
        break;
      }
    }
    if (curSection !== activeItem) {
      setActiveItem(curSection!);
    }
  };

  /*
   * Create the list of MenuItems based on the sections object we have defined above
   */
  const menuList = Object.keys(menuItems).map((e, i) => (
    <MenuItem
      itemName={e}
      key={`menuitem_${i}`}
      active={e === activeItem ? true : false}
    />
  ));

  /*
   * Return the JSX Menu, complete with nested MenuItems
   */
  return (
    <Box
      as={"nav"}
      css={{
        py: "$4",
        "@lg": {
          top: 0,
          position: "sticky",
        },
      }}
    >
      <ul>{menuList}</ul>
    </Box>
  );
};
