import type {
  EmailDetail,
  EmailDetailDTO,
  EmailSummary,
  ReceivedEmailDTO,
  SentEmailDTO,
} from "@/types/email";
import type { User, UserDTO } from "@/types/user";

/**
 * Mappers isolam o contrato da API (nomes em português, snake_case...) do
 * restante da aplicação. Se o backend mudar, só este arquivo muda.
 */
export function toUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.nome,
    email: dto.email,
    avatarUrl: dto.fotoDePerfil || null,
  };
}

export function toReceivedEmail(dto: ReceivedEmailDTO): EmailSummary {
  return {
    id: dto.email_id,
    title: dto.titulo,
    counterpart: dto.enviado_por ?? "Usuário removido",
    seen: dto.jaVisto,
  };
}

export function toSentEmail(dto: SentEmailDTO): EmailSummary {
  return {
    id: dto.email_id,
    title: dto.titulo,
    counterpart: dto.enviado_para ?? "Usuário removido",
    seen: dto.jaVisto,
  };
}

export function toEmailDetail(id: string, dto: EmailDetailDTO): EmailDetail {
  return {
    id,
    title: dto.titulo,
    content: dto.content,
    from: dto.enviado_por,
  };
}
