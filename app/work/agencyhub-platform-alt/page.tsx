import { redirect } from "next/navigation";

// Deprecated comparison route. Alt-2 is now the official AgencyHub case study
// at /work/agencyhub-platform, so this redirects there.
export default function AgencyHubAltRedirect() {
  redirect("/work/agencyhub-platform");
}
