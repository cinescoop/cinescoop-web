import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#0E0A48",
        color: "#FFFFFF",
      },
      option: {
        color: "black",
      },
    },
  },

  fonts: {
    body: "Nanum Gothic",
    heading: "Nanum Gothic",
  },

  colors: {
    pink: "#FF5AF1",
    darkBlue: "#0E0A48",
    brightBlue: "#3843CD",
    white: "#FFFFFF",
    grey: "#C4C4C4",
    darkGrey: "#A9A9A",
    yellow: "#FFE800",
  },
});

export default theme;
