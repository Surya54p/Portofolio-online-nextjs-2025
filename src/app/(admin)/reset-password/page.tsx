import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  // Ambil token dari query param
  const token = (searchParams?.token as string) ?? "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ResetPasswordForm token={token} />
    </div>
  );
}
