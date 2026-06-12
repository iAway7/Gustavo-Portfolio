import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from "@react-email/components";

export type ContactNotificationEmailProps = {
  name: string;
  email: string;
  project?: string;
  message: string;
  submittedAt: string;
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
    margin: "0 0 24px"
  },
  label: {
    color: "#555555",
    fontSize: "12px",
    letterSpacing: "0.12em",
    margin: "0 0 4px",
    textTransform: "uppercase" as const
  },
  value: {
    color: "#171717",
    fontSize: "15px",
    lineHeight: "24px",
    margin: "0 0 16px"
  },
  hr: {
    borderColor: "rgba(23, 23, 23, 0.12)",
    margin: "8px 0 24px"
  },
  message: {
    color: "#171717",
    fontSize: "15px",
    lineHeight: "26px",
    margin: 0,
    whiteSpace: "pre-wrap" as const
  },
  footer: {
    color: "#555555",
    fontSize: "12px",
    lineHeight: "20px",
    margin: "24px 0 0",
    textAlign: "center" as const
  }
};

export function ContactNotificationEmail({
  name,
  email,
  project,
  message,
  submittedAt
}: ContactNotificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{`${name} sent a message through gpolin.com`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>New portfolio inquiry</Heading>

          <Section>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            {project ? (
              <>
                <Text style={styles.label}>Project</Text>
                <Text style={styles.value}>{project}</Text>
              </>
            ) : null}

            <Text style={styles.label}>Submitted</Text>
            <Text style={styles.value}>{submittedAt}</Text>
          </Section>

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Message</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>
        </Container>
        <Text style={styles.footer}>
          Sent from the contact form at gpolin.com. Reply directly to reach {name}.
        </Text>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
