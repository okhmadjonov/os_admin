import React, { useState } from "react";
import { UserPlus, X, Shield, Mail, Lock, User as UserIcon, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { authApi, RegisterParams } from "@/services/api";
import styles from "./Users.module.scss";

interface UserItem {
  id: string;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role: string;
}

const INITIAL_USERS: UserItem[] = [
  {
    id: "usr_1",
    userName: "martin",
    email: "martin.iden.jack@london.com",
    firstName: "Martin",
    lastName: "Iden",
    phoneNumber: "+998 90 123 45 67",
    role: "SuperAdmin",
  },
];

const Users: React.FC = () => {
  const [usersList, setUsersList] = useState<UserItem[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<RegisterParams>({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "Admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userName.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.warning("Iltimos, username, email va parolni to'ldiring!");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.register({
        userName: formData.userName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        firstName: formData.firstName?.trim() || undefined,
        lastName: formData.lastName?.trim() || undefined,
        phoneNumber: formData.phoneNumber?.trim() || undefined,
        role: formData.role || "User",
      });

      if (response.isSuccess) {
        toast.success(response.message || "Yangi foydalanuvchi muvaffaqiyatli yaratildi!");
        
        const newCreatedUser: UserItem = {
          id: response.data?.user?.id || Date.now().toString(),
          userName: formData.userName,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          role: formData.role || "User",
        };

        setUsersList((prev) => [newCreatedUser, ...prev]);
        setIsModalOpen(false);
        setFormData({
          userName: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          role: "Admin",
        });
      } else {
        toast.error(response.message || "Foydalanuvchi yaratishda xatolik yuz berdi");
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.Errors?.[0] ||
        err.message ||
        "Foydalanuvchi yaratishda xatolik yuz berdi";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.titleBox}>
          <h2>Foydalanuvchilarni boshqarish</h2>
          <p>SuperAdmin paneli orqali yangi admin va foydalanuvchilarni ro'yxatdan o'tkazish</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          <span>Foydalanuvchi Qo'shish</span>
        </button>
      </div>

      <div className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>Foydalanuvchi</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Roli</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((usr) => (
              <tr key={usr.id}>
                <td>
                  <strong>
                    {[usr.firstName, usr.lastName].filter(Boolean).join(" ") || usr.userName}
                  </strong>
                  <br />
                  <small style={{ color: "#64748b" }}>@{usr.userName}</small>
                </td>
                <td>{usr.email}</td>
                <td>{usr.phoneNumber || "-"}</td>
                <td>
                  <span
                    className={`${styles.roleBadge} ${
                      usr.role.toLowerCase() === "superadmin"
                        ? styles.superadmin
                        : usr.role.toLowerCase() === "admin"
                        ? styles.admin
                        : styles.user
                    }`}
                  >
                    {usr.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Yangi Foydalanuvchi Qo'shish</h3>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="userName">Username *</label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="john_doe"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="firstName">Ismi</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="lastName">Familiyasi</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="password">Parol *</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Maxfiylik paroli"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="phoneNumber">Telefon raqami</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="+998 90 123 45 67"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="role">Biriktiriladigan Rol *</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange}>
                  <option value="SuperAdmin">SuperAdmin (Bosh ma'mur)</option>
                  <option value="Admin">Admin (Boshqaruvchi)</option>
                  <option value="User">User (Oddiy foydalanuvchi)</option>
                </select>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  Bekor qilish
                </button>
                <button type="submit" className={styles.saveBtn} disabled={loading}>
                  {loading ? "Yaratilmoqda..." : "Saqlash va Yaratish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
