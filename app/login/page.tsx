import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"

export default function LoginPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(var(--bg-primary))" }}>
      <Header />
      <main className="flex items-center justify-center py-20">
        <LoginForm />
      </main>
    </div>
  )
}
