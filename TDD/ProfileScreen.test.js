jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ProfileScreen from "../profile/ProfileScreen";
//import { Ionicons } from '@expo/vector-icons'; // Ensure this is correctly imported if used within your test components

// Mock navigation and route

const mockRoute = {
  params: {
    email: "test@example.com",
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    address: "123 Test Street",
  },
};
describe("ProfileScreen", () => {
  const mockNavigate = jest.fn();
  test("navigates back to login form on logout", async () => {
    const { getByText, getByTestId } = render(
      <ProfileScreen
        navigation={{ navigate: mockNavigate }}
        route={mockRoute}
      />
    );

    // Simulate pressing the logout button
    fireEvent.press(getByTestId("options-toggle"));
    fireEvent.press(getByText("Logout"));

    // Assert that navigate was called with 'LoginForm'
    expect(mockNavigate).toHaveBeenCalledWith("LoginForm");
  });
});
