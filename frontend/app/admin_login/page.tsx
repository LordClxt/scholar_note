import { LoginForm } from "@/components/admin-login-form"
export default function Page() {
  return (
    <div className="ruled flex min-h-svh w-full flex-col items-center justify-center gap-8 p-6 md:p-10">
      <h1 className="border-l-[3px] border-pen pl-3 text-2xl font-semibold tracking-tight">
        Scholar Note
      </h1>
      <div className="sheet w-full max-w-sm p-8">
        <LoginForm />
      </div>
    </div>
  )
}
