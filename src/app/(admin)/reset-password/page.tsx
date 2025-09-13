import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token ?? ""; // ambil token dari URL
  return <ResetPasswordForm token={token} />;
}
