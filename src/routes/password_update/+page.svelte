<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { page } from "$app/stores";
  import { applyAction, enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  toast.push(
    "La contraseña creada anteriormente era temporal. Porfavor actualizar la contraseña.",
    { classes: ["warning"] }
  );

  let password = "";
  let confirmed = "";

  let loading = false;

  const update_password: SubmitFunction = ({ formData, cancel }) => {
    loading = true;
    if (formData.get("password") !== formData.get("confirmed")) {
      loading = false;
      cancel();
      toast.push("Contraseñas no coinciden", { classes: ["warning"] });
    }

    return async ({ result }) => {
      loading = false;

      if (result.type === "success" || result.type === "redirect") {
        toast.push("Contraseña actualizada", { classes: ["success"] });
        await applyAction(result);
      }

      if (result.type === "failure") {
        toast.push(
          "Se requiere nueva contraseña y confirmación de la nueva contraseña",
          { classes: ["warning"] }
        );
      }
    };
  };
</script>

<svelte:head>
  <title>Actualizar Contraseña</title>
</svelte:head>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content w-full max-w-sm flex-col">
    <form
      class="card flex-shrink-0 w-full shadow-2xl bg-base-100"
      method="POST"
      use:enhance={update_password}
    >
      <div class="card-body">
        <h1
          class="text-2xl text-left font-medium tracking-wide text-neutral-focus"
        >
          Actualizar Contraseña
        </h1>
        <div class="form-control mt-3 lg:mt-4">
          <input type="hidden" value={$page.data.userID} name="userID" />
          <input type="hidden" value={$page.data.username} name="username" />
          <input
            type="password"
            placeholder="Nueva Contraseña"
            class="input input-bordered
        input-secondary"
            bind:value={password}
            name="password"
          />
        </div>
        <div class="form-control mt-3 lg:mt-4">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            class="input input-bordered
        input-secondary"
            bind:value={confirmed}
            name="confirmed"
          />
        </div>
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-secondary">
            {#if loading}
              <span class="loading loading-spinner loading-md" />
            {:else}
              Actualizar
            {/if}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
