import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  const facturas = prisma.facturas.findMany({
    include: {
      cliente: true,
      trackings: true,
    },
    orderBy: [{ factura_id: "desc" }],
  });

  return { facturas };
};

export const actions: Actions = {
  update_pagado: async ({ request }) => {
    const formData = await request.formData();

    const factura_id = Number(formData.get("factura_id"));
    const pagado = String(formData.get("pagado"));

    let status = false;
    if (pagado === "false") {
      status = true;
    }

    const updated = await prisma.facturas.update({
      where: {
        factura_id: factura_id,
      },
      data: {
        pagado: status,
      },
    });

    return { factura_id };
  },
};
