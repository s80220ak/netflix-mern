import React from "react";
import { render, screen } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../src/components/common/Logo";

test("renders logo with correct text, font weight, and color", () => {
  // Arrange
  const theme = createTheme();
  const primaryColor = "#3f51b5";
  theme.palette.primary.main = primaryColor;
  render(
    <ThemeProvider theme={theme}>
      <Logo />
    </ThemeProvider>
  );

  // Act
  const logoText = screen.getByText("NETFLIX");

  // Assert
  expect(logoText).toBeInTheDocument();
  expect(logoText).toHaveStyle(`font-weight: 700`);
  expect(logoText).toHaveStyle(`color: ${primaryColor}`);
  expect(logoText).toHaveStyle(`font-size: 1.7rem`);
});
