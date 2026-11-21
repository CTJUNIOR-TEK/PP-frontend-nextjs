import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";
import { Field } from "./field";

describe("Field", () => {
  it("associa label, input e mensagem de erro", () => {
    render(<Field label="E-mail" name="email" errors={["Informe um e-mail válido"]} />);

    const input = screen.getByLabelText("E-mail");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Informe um e-mail válido");
  });

  it("renderiza textarea quando multiline", () => {
    render(<Field multiline label="Conteúdo" name="content" />);
    expect(screen.getByLabelText("Conteúdo").tagName).toBe("TEXTAREA");
  });
});

describe("Avatar", () => {
  it("usa a inicial do nome quando não há foto", () => {
    render(<Avatar name="joão" src={null} />);
    expect(screen.getByRole("img", { name: "Avatar de joão" })).toHaveTextContent("J");
  });

  it("usa a foto quando existe", () => {
    render(<Avatar name="Ana" src="https://img.com/ana.png" />);
    expect(screen.getByRole("img", { name: "Foto de Ana" })).toHaveAttribute("src", "https://img.com/ana.png");
  });
});
