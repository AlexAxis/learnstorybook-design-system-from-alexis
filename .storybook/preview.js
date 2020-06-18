import React from "react";
import { addDecorator } from "@storybook/react";
import { GlobalStyle } from "../src/shared/global";
import { withA11y } from "@storybook/addon-a11y";

//--- we can see how this change affect the code in the story Avatar-Initials
//--- the font of the letters is different

addDecorator(withA11y);
addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));
