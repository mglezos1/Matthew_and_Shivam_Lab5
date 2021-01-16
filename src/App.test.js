import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import React from "react";
import userEvent from "@testing-library/user-event";

describe("<App /> tests", () => {
  it("renders <App />", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  });

  it("should add a todo item", async () => {
    async function fetchPost() {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({
          userId: 3,
          id: Math.floor(Math.random() * 100) + 1,
          title: "Do math homework",
          completed: false
        })
      })
        .then(res => res.json())
        .then(data => {
        });
    }
    
    fetchPost();
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.type(screen.getByRole("textbox"), "Do math homework");
    userEvent.click(screen.getByText(/add new todo/i));
    await waitForElementToBeRemoved(() => screen.getByText(/saving/i));
    expect(screen.getByText(/do math homework/i)).toBeInTheDocument();
  });

  it("remove todo from list", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByTestId("close-btn-3"));
    expect(screen.queryByText(/fugiat veniam minus/i)).not.toBeInTheDocument();
  });

  it("should cross out after completing", async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    userEvent.click(screen.getByTestId("checkbox-1"));
    expect(screen.getByText(/delectus aut autem/i)).toHaveClass("completed");
  });
});
