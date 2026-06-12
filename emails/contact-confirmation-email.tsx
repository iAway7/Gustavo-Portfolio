import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text
} from "@react-email/components";

export type ContactConfirmationEmailProps = {
  name: string;
};

const styles = {
  body: {
    backgroundColor: "#f6f6f2",
    fontFamily:
      '"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: "32px 16px"
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid rgba(23, 23, 23, 0.12)",
    borderRadius: "16px",
    margin: "0 auto",
    maxWidth: "560px",
    padding: "32px"
  },
  heading: {
    color: "#171717",
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    margin: "0 0 16px"
  },
  text: {
    color: "#171717",
    fontSize: "15px",
    lineHeight: "26px",
    margin: "0 0 16px"
  },
  hr: {
    borderColor: "rgba(23, 23, 23, 0.12)",
    margin: "24px 0"
  },
  signature: {
    color: "#171717",
    fontSize: "15px",
    lineHeight: "24px",
    margin: 0
  },
  signatureMuted: {
    color: "#555555",
    fontSize: "13px",
    lineHeight: "20px",
    margin: "2px 0 0"
  },
  link: {
    color: "#171717",
    textDecoration: "underline"
  },
  footer: {
    color: "#555555",
    fontSize: "12px",
    lineHeight: "20px",
    margin: "24px 0 0",
    textAlign: "center" as const
  }
};

export function ContactConfirmationEmail({ name }: ContactConfirmationEmailProps) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <Html lang="en">
      <Head />
      <Preview>Your message was received. I will get back to you shortly.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Thanks for reaching out</Heading>
          <Text style={styles.text}>Hi {firstName},</Text>
          <Text style={styles.text}>
            Your message arrived safely. I read every inquiry personally and will get
            back to you within one to two business days.
          </Text>
          <Text style={styles.text}>
            In the meantime, feel free to explore my recent work at{" "}
            <Link href="https://gpolin.com/work" style={styles.link}>
              gpolin.com/work
            </Link>
            .
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.signature}>Gustavo Polin</Text>
          <Text style={styles.signatureMuted}>Product Designer · gpolin.com</Text>
        </Container>
        <Text style={styles.footer}>
          You are receiving this because you contacted me through gpolin.com.
        </Text>
      </Body>
    </Html>
  );
}

export default ContactConfirmationEmail;
