import { ThemeManager } from "react-native-ui-lib";

// with plain object
ThemeManager.setComponentTheme("Card", {
  borderRadius: 8,
});

// with a dynamic function
ThemeManager.setComponentTheme(
  "Button",
  ({ props, context }: { props: any; context: any }) => {
    if (props.square) {
      return {
        borderRadius: 0,
      };
    }
  }
);
