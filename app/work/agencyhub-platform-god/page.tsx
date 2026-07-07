import { redirect } from "next/navigation";

// This process-led redesign was promoted to the official AgencyHub case study
// at /work/agencyhub-platform. This comparison route now redirects there.
export default function AgencyHubGodRedirect() {
  redirect("/work/agencyhub-platform");
}
