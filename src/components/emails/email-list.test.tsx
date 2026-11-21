import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { EmailSummary } from "@/types/email";
import { EmailList } from "./email-list";

const emails: EmailSummary[] = [
  { id: "1", title: "Reunião amanhã", counterpart: "Ana", seen: false },
  { id: "2", title: "Relatório", counterpart: "Bia", seen: true },
];

describe("EmailList", () => {
  it("renderiza cada e-mail com link para o detalhe", () => {
    render(<EmailList emails={emails} counterpartLabel="De" seenLabel={(seen) => (seen ? "Lido" : "Novo")} />);

    expect(screen.getByRole("link", { name: /Reunião amanhã/ })).toHaveAttribute("href", "/email/1");
    expect(screen.getByText("Novo")).toBeInTheDocument();
    expect(screen.getByText("Lido")).toBeInTheDocument();
  });

  it("renderiza ações extras apenas onde forem passadas", () => {
    render(
      <EmailList
        emails={emails}
        counterpartLabel="Para"
        seenLabel={() => ""}
        renderActions={(email) => (email.seen ? null : <button>apagar {email.id}</button>)}
      />,
    );

    expect(screen.getByRole("button", { name: "apagar 1" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "apagar 2" })).not.toBeInTheDocument();
  });
});
