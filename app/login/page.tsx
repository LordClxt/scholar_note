import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        <div className="flex justify-center gap-2">
          <a href="#" className="flex  items-center font-poppins font-bold bg-clip-text text-transparent gap-2 w-full justify-center text-4xl bg-gradient-to-br from-yellow-200 to-yellow-500 p-2 rounded">
            SCHOLAR_NOTE
          </a>
        </div>
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
      </div>
    </div>
  )
}
