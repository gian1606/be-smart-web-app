import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf, Lock, ShieldCheck } from "lucide-react";
import { MOCK_CREDENTIALS, PB_CREDENTIALS, CA_CREDENTIALS } from "../mock/data";
import { MOCK_CREDENTIALS as CLUSTER_CREDENTIALS } from "../cluster-admin/mock/data";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    // Simulate async auth
    setTimeout(() => {
      if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
        sessionStorage.setItem("bs_auth", "true");
        sessionStorage.setItem("bs_role", "super_admin");
        navigate("/super-admin/dashboard");
      } else if (email === CLUSTER_CREDENTIALS.email && password === CLUSTER_CREDENTIALS.password) {
        sessionStorage.setItem("bs_auth", "true");
        sessionStorage.setItem("bs_role", "cluster_admin");
        navigate("/cluster-admin/dashboard");
      } else if (email === CA_CREDENTIALS.email && password === CA_CREDENTIALS.password) {
        sessionStorage.setItem("bs_ca_auth", "true");
        navigate("/ca/dashboard");
      } else if (email === PB_CREDENTIALS.email && password === PB_CREDENTIALS.password) {
        sessionStorage.setItem("bs_pb_auth", "true");
        navigate("/pb/dashboard");
      } else {
        setErrors({ form: "Invalid email or password. Please try again." });
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #1B5E20 100%)",
      }}
    >
      <div
        className="w-full bg-white flex flex-col items-center"
        style={{
          maxWidth: 480,
          borderRadius: 16,
          padding: 40,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-xl mb-4"
          style={{ width: 56, height: 56, background: "#E8F5E9" }}
        >
          <Leaf size={28} color="#2E7D32" />
        </div>

        {/* Wordmark */}
        <div className="font-bold text-text-primary text-center" style={{ fontSize: 28 }}>
          BE-SMART
        </div>
        <div
          className="text-center mt-1 mb-5"
          style={{ fontSize: 12, color: "#388E3C", maxWidth: 320, lineHeight: 1.5 }}
        >
          Batangas Environmental Segregation, Monitoring,
          <br />
          Analytics &amp; Rewards Technology
        </div>

        {/* Role chip */}
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2 mb-6"
          style={{
            background: "#E8F5E9",
            border: "1px solid #A5D6A7",
            fontSize: 13,
          }}
        >
          <ShieldCheck size={15} color="#2E7D32" />
          <span className="font-semibold text-primary">Staff Portal</span>
          <span className="text-text-secondary">· Sign in with your role credentials</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4" noValidate>
          {errors.form && (
            <div
              className="rounded-lg px-4 py-3 text-center font-medium"
              style={{ background: "#FFEBEE", color: "#D32F2F", fontSize: 13 }}
            >
              {errors.form}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined, form: undefined })); }}
              placeholder="superadmin@besmart.gov.ph"
              className="w-full rounded-lg px-4 py-2.5 outline-none transition-colors"
              style={{
                fontSize: 14,
                border: errors.email ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB",
                background: "#F9FAFB",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2E7D32")}
              onBlur={(e) => (e.target.style.borderColor = errors.email ? "#D32F2F" : "#E5E7EB")}
            />
            {errors.email && (
              <span style={{ fontSize: 12, color: "#D32F2F" }}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-text-primary" style={{ fontSize: 13 }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, form: undefined })); }}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-2.5 pr-11 outline-none transition-colors"
                style={{
                  fontSize: 14,
                  border: errors.password ? "1.5px solid #D32F2F" : "1.5px solid #E5E7EB",
                  background: "#F9FAFB",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2E7D32")}
                onBlur={(e) => (e.target.style.borderColor = errors.password ? "#D32F2F" : "#E5E7EB")}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <span style={{ fontSize: 12, color: "#D32F2F" }}>{errors.password}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-3 font-semibold text-white transition-opacity mt-1"
            style={{
              background: "#2E7D32",
              fontSize: 15,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign In to Dashboard"}
          </button>
        </form>

        {/* Security note */}
        <div
          className="flex items-center gap-1.5 mt-5"
          style={{ fontSize: 12, color: "#9CA3AF" }}
        >
          <Lock size={12} />
          <span>Secured access · Batangas City Government</span>
        </div>
      </div>
    </div>
  );
}
