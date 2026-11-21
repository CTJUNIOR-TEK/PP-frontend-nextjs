/** Item de GET /my-emails. */
export type ReceivedEmailDTO = {
  email_id: string;
  titulo: string;
  enviado_por: string;
  jaVisto: boolean;
};

/** Item de GET /sent-emails. */
export type SentEmailDTO = {
  email_id: string;
  titulo: string;
  enviado_para: string;
  jaVisto: boolean;
};

/** Corpo de GET /email/:id. */
export type EmailDetailDTO = {
  titulo: string;
  content: string;
  enviado_por: string;
};

/** Linha das listas de entrada/enviados. `counterpart` é o remetente ou o destinatário. */
export type EmailSummary = {
  id: string;
  title: string;
  counterpart: string;
  seen: boolean;
};

export type EmailDetail = {
  id: string;
  title: string;
  content: string;
  from: string;
};
