import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, Dispatch } from "@/redux";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import vectorBg from "@/assets/vector.png";
import styles from "./Login.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.warning("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const success = await dispatch.auth.login({ username, password });
    if (success) {
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
      navigate("/");
    } else {
      toast.error(error || "Foydalanuvchi nomi yoki parol noto'g'ri!");
    }
  };

  const handleFillDemo = () => {
    setUsername("martin");
    setPassword("Admin123!");
    toast.info("Admin backend ma'lumotlari kiritildi (martin / Admin123!)");
  };

  return (
    <div
      className={styles.loginContainer}
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "280px auto",
      }}
    >
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.logoIcon} />
            <span className={styles.logoText}>Online Store Admin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorAlert}>{error}</div>}

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.fieldIcon} />
              <input
                id="username"
                type="text"
                placeholder="Masalan: martin yoki email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.fieldIcon} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.toggleEye}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                Kirish <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className={styles.demoBox}>
          <div className={styles.demoHeader}>
            <span>Backend Admin (Seeded User):</span>
            <button type="button" onClick={handleFillDemo}>
              Demo To'ldirish (martin)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
