import { RegisterForm } from "@/components/auth/register-form"
import { Header } from "@/components/layout/header"

export default function RegisterPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(var(--bg-primary))" }}>
      <Header />
      <main className="flex items-center justify-center py-20">
        <RegisterForm />
      </main>
    </div>
  )
}
