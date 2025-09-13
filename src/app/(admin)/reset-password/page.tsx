import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string>>;
}) {
  // tunggu searchParams (karena dianggap Promise sama Next.js)
  const params = await searchParams;
  const token = params?.token ?? "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ResetPasswordForm token={token} />
    </div>
  );
}
