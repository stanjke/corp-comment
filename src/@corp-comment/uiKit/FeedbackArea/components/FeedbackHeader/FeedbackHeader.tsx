import React from "react";
import BackgroundPattern from "./components/BackgroundPattern/BackgroundPattern";
import Logo from "../../../Logo/Logo";
import Title from "./components/Title/Title";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";

export default function FeedbackHeader() {
  return (
    <header>
      <BackgroundPattern />
      <Logo />
      <Title />
      <FeedbackForm />
    </header>
  );
}
