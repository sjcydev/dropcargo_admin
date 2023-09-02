<script lang="ts">
  import {
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Img,
    Link,
    styleToString,
  } from "svelte-email";

  let logo =
    "https://res.cloudinary.com/dx312n0ce/image/upload/f_auto,q_auto/wwssl6h9nifcwvmghrqy";
  let logoNombre =
    "https://res.cloudinary.com/dx312n0ce/image/upload/f_auto,q_auto/vvvwedj4hjflqnlhpwzj";

  const preview = "Tienes paquetes listo para retirar";
  export let nombre: String;
  export let casillero: String;
  export let trackings: Trackings[];

  let ubicacion = "Miraflores Calle 79B Oeste, Casa 195";
  let maps = "https://maps.app.goo.gl/w8SLQSWZCCbS2sQa8?g_st=iw";

  const fontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

  const main = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
  };

  const container = {
    "max-width": "50em",
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "100%",
  };

  const heading = {
    fontFamily,
    fontSize: "24px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
  };

  const heading2 = {
    fontFamily,
    fontSize: "20px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
  };

  const paragraph = {
    fontFamily,
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
  };

  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };

  const logoIcon = {
    width: "2.75rem",
    height: "auto",
    "margin-right": "0.5rem",
  };

  const logoName = {
    width: "8rem",
    height: "auto",
  };
  const logoContainer = {
    display: "flex",
    width: "fit-content",
    margin: "0 auto",
  };

  const footerTitle = {
    ...paragraph,
    fontSize: "16px",
  };

  const footerText = {
    ...paragraph,
    fontSize: "14px",
  };
</script>

<Html>
  <Head />
  <Preview {preview} />
  <Container style={main}>
    <Container style={container}>
      <Container style={logoContainer}>
        <Img
          src={logo}
          width="30"
          height="30"
          style={logoIcon}
          alt="DropCargoExpress
        Logo"
        />
        <Img
          src={logoNombre}
          width="30"
          height="30"
          style={logoName}
          alt="DropCargoExpress
        Logo"
        />
      </Container>
      <Heading style={heading}>Ya puedes retirar tu orden!</Heading>
      <Text style={paragraph}>
        Hola {nombre},
      </Text>
      <Text style={paragraph}>
        Esperamos que te encuentres bien. Tu orden llego a Panamá y esta listo
        para retirar en nuestra sucursal. Al llegar a la sucursal, presentar el
        numero de casillero que se va a retirar.
      </Text>
      <Text style={paragraph}>
        Nuestra sucursal esta localizada en:
        <br />
        <Link href={maps}>{ubicacion}</Link>
      </Text>
      <Hr style={hr} />
      <Heading style={heading2}>Información de tus Paquetes</Heading>
      <Text style={paragraph}>Casillero: {casillero}</Text>
      <table style={styleToString(container)}>
        <thead>
          <tr style="text-align: left;">
            <th>Numero de Tracking</th>
            <th>Peso (lbs)</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {#each trackings as tracking}
            <tr>
              <td>
                {tracking.numero_tracking}
              </td>
              <td>
                {tracking.peso}
              </td>
              <td>
                {tracking.precio}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <Text style={paragraph}
        >Puedes encontrar tambien adjuntado la factura con más detalles.</Text
      >
      <Text style={paragraph}>Gracias por preferir DropCargoExpress!</Text>
    </Container>
  </Container>
</Html>
