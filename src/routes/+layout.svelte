<script>
  import { page } from "$app/stores";
  import "../app.css";
  import { navigating } from "$app/stores";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Fa from "svelte-fa";
  import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

  let options = {
    theme: {
      "--toastBarHeight": 0,
      "--toastPadding": "0 10px",
      "--toastBorderRadius": "0.5rem",
    },
  };

  let protectedRoutes = new Set(["/login", "/aa1834160", "/password_update"]);
  let floatRoutes = new Set(["/facturar", "/tracking"]);
</script>

<SvelteToast {options} />
{#if protectedRoutes.has($page.url.pathname)}
  {#if $navigating}
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content w-full max-w-sm flex-col">
        <span class="loading loading-infinity text-secondary w-20" />
      </div>
    </div>
  {:else}
    <slot />
  {/if}
{:else}
  <!-- <div class="drawer lg:drawer-open"> -->
  <!--   <input id="my-drawer-2" type="checkbox" class="drawer-toggle" /> -->
  <!--   <div class="drawer-content flex flex-col items-center justify-center"> -->
  <!--     {#if $navigating} -->
  <!--       <span class="loading loading-infinity text-primary w-20" /> -->
  <!--     {:else} -->
  <!--       <slot /> -->
  <!--     {/if} -->
  <!--     <!-- <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> -->
  <!--   </div> -->
  <!--   <div class="drawer-side"> -->
  <!--     <label for="my-drawer-2" class="drawer-overlay" /> -->
  <!--     <ul class="menu p-4 w-80 h-full bg-primary text-white"> -->
  <!--       <div class="menu-title text-white"> -->
  <!--         <h1 -->
  <!--           class="text-xl font-medium flex justify-between -->
  <!--       place-items-center" -->
  <!--         > -->
  <!--           Menu <form method="POST"> -->
  <!--             <button type="submit" formaction="/?/logout" -->
  <!--               ><Fa icon={faRightFromBracket} /></button -->
  <!--             > -->
  <!--           </form> -->
  <!--         </h1> -->
  <!--       </div> -->
  <!--       <li><a href="/">Clientes</a></li> -->
  <!--       <li><a href="/facturar">Facturar</a></li> -->
  <!--       <li><a href="/facturas">Ver Facturas</a></li> -->
  <!--       <li><a href="/tracking">Tracking Interno</a></li> -->
  <!--     </ul> -->
  <!--   </div> -->
  <!-- </div> -->

  <div
    class="navbar bg-primary text-white {floatRoutes.has($page.url.pathname)
      ? 'relative lg:fixed'
      : ''}"
  >
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100
          rounded-box w-52 text-black"
        >
          <!-- <li><a>Item 1</a></li> -->
          <!-- <li> -->
          <!--   <a>Parent</a> -->
          <!--   <ul class="p-2"> -->
          <!--     <li><a>Submenu 1</a></li> -->
          <!--     <li><a>Submenu 2</a></li> -->
          <!--   </ul> -->
          <!-- </li> -->
          <!-- <li><a>Item 3</a></li> -->
          <li><a href="/">Clientes</a></li>
          <li><a href="/facturar">Facturar</a></li>
          <li><a href="/facturas">Ver Facturas</a></li>
          <li><a href="/tracking">Tracking Interno</a></li>
        </ul>
      </div>
      <a href="/" class="btn btn-ghost normal-case text-xl">DropCargo Express</a
      >
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/">Clientes</a></li>
        <li><a href="/facturar">Facturar</a></li>
        <li><a href="/facturas">Ver Facturas</a></li>
        <li><a href="/tracking">Tracking Interno</a></li>
      </ul>
    </div>
    <div class="navbar-end" />
  </div>
  {#if $navigating}
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content w-full max-w-sm flex-col">
        <span class="loading loading-infinity text-primary w-20" />
      </div>
    </div>
  {:else}
    <slot />
  {/if}
{/if}

<style>
  :global(.success) {
    --toastBackground: hsl(var(--su));
    --toastColor: hsl(var(--suc));
  }

  :global(.warning) {
    --toastBackground: hsl(var(--wa));
    --toastColor: hsl(var(--wac));
  }
</style>
