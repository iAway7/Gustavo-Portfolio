import { redirect } from "next/navigation";

// Alt-2 was promoted to the official AgencyHub case study at
// /work/agencyhub-platform. This comparison route now redirects there.
export default function AgencyHubAlt2Redirect() {
  redirect("/work/agencyhub-platform");
}
