"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { loginUser } from "./auth.api";
import { saveToken } from "./auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(username, password );
      saveToken(data.token);

      toast.success("Login successful");
      router.replace("/orders");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-96 border p-6 rounded-md shadow-md bg-white space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <Input
          placeholder="Username"
          value={username}
          disabled={loading}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
