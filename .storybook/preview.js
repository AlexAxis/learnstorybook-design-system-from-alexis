import React from "react";
import { addDecorator } from "@storybook/react";
import { GlobalStyle } from "../src/shared/global";

//--- we can see how this change affect the code in the story Avatar-Initials
//--- the font of the letters is different

addDecorator((story) => (
  <>
    <GlobalStyle />
    {story()}
  </>
));
