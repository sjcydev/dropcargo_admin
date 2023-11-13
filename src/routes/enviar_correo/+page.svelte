<script lang="ts">
  import Editor from "@tinymce/tinymce-svelte";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { toast } from "@zerodevx/svelte-toast";

  let conf = {
    height: 500,
    plugins: [
      "a11ychecker",
      "advlist",
      "advcode",
      "advtable",
      "autolink",
      "checklist",
      "export",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "powerpaste",
      "fullscreen",
      "formatpainter",
      "insertdatetime",
      "media",
      "table",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist checklist outdent indent | removeformat | code table help",
    menubar: false,
    language: "es",
  };

  let email_html = "";
  let email_text = "";

  let loading = false;
  const enviarCorreo: SubmitFunction = ({ cancel, formData }) => {
    const subject = String(formData.get("subject"));
    const body = String(formData.get("body"));

    loading = true;

    if (body.length < 1 || body === "null") {
      loading = false;
      toast.push("Contenido del correo es invalido.", { classes: ["warning"] });
      cancel();
    } else if (subject.length < 1 || subject === "null") {
      loading = false;
      toast.push("Sujeto es requerido!", { classes: ["warning"] });
      cancel();
    }

    let res = confirm("Seguro que quieres enviar este correo?");
    if (!res) {
      loading = false;
      cancel();
    }

    return async ({ result }) => {
      if (result.type === "success") {
        loading = false;

        toast.push("Enviando los correos", { classes: ["success"] });
      }

      if (result.type === "redirect") {
        loading = false;
        toast.push("Correos Enviados", { classes: ["success"] });
        await applyAction(result);
      }
    };
  };
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col w-full">
    <form method="POST" use:enhance={enviarCorreo}>
      <div class="form-control mb-1 lg:mb-2">
        <label for="subject" class="label">
          <span class="label-text">Sujeto </span>
        </label>
        <input class="input input-primary" name="subject" />
      </div>
      <Editor {conf} bind:value={email_html} bind:text={email_text} />
      <textarea bind:value={email_html} hidden name="content" />
      <textarea bind:value={email_text} hidden name="content_text" />
      <button class="btn btn-primary w-full mt-2 text-white">
        {#if loading}
          <span class="loading loading-spinner loading-md" />
        {:else}
          Enviar Correo
        {/if}
      </button>
    </form>
  </div>
</div>
