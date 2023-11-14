import { redirect, fail, type Actions } from "@sveltejs/kit";
import Postmark from "postmark";
import { SECRET_POSTMARK_API_KEY } from "$env/static/private";
import { prisma } from "$lib/server/prisma";
import type { Usuarios } from "@prisma/client";

let client = new Postmark.ServerClient(SECRET_POSTMARK_API_KEY);

async function enviarClientes(
  subject: string,
  body: string,
  body_text: string,
  clientes: Usuarios[]
) {
  clientes.forEach((cliente) => {
    client.sendEmail({
      From: "info@dropcargoexpress.com",
      To: cliente.correo,
      Subject: subject,
      HtmlBody: body,
      TextBody: body_text,
      MessageStream: "broadcast",
    });
  });
}

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const subject = String(formData.get("subject"));
    const body = String(formData.get("content"));
    const body_text = String(formData.get("content_text"));

    if (body.length < 1) {
      return fail(400);
    }

    const clientes = await prisma.usuarios.findMany();

    await enviarClientes(subject, body, body_text, clientes);

    throw redirect(303, "/");
  },
};
