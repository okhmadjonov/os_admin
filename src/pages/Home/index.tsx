import React, { useState } from "react";
import { Users, Search, ChevronDown, Filter } from "lucide-react";
import Table, { Column } from "@/components/table";
import Pagination from "@/components/pagination";
import styles from "./Home.module.scss";

interface UserRow {
  id: number;
  name: string;
  email: string;
  city: string;
  date: string;
}

const mockUsersData: UserRow[] = [
  { id: 1, name: "Floyd Miles", email: "tanya.hill@example.com", city: "Omsk", date: "7/11/19" },
  { id: 2, name: "Kristin Watson", email: "curtis.weaver@example.com", city: "Nalchik", date: "4/4/18" },
  { id: 3, name: "Annette Black", email: "deanna.curtis@example.com", city: "Khabarovsk", date: "3/4/16" },
  { id: 4, name: "Wade Warren", email: "felicia.reid@example.com", city: "Mannheim", date: "4/21/12" },
  { id: 5, name: "Esther Howard", email: "dolores.chambers@example.com", city: "Cincinnati (OH)", date: "12/4/17" },
  { id: 6, name: "Cameron Williamson", email: "michael.mitc@example.com", city: "Sterlitamak", date: "8/30/14" },
  { id: 7, name: "Albert Flores", email: "sara.cruz@example.com", city: "Lomas de Zamora", date: "8/15/17" },
  { id: 8, name: "Robert Fox", email: "kenzi.lawson@example.com", city: "Greensboro (NC)", date: "5/30/14" },
  { id: 9, name: "Jenny Wilson", email: "jackson.graham@example.com", city: "Lübeck", date: "5/27/15" },
  { id: 10, name: "Ralph Edwards", email: "willie.jennings@example.com", city: "Vladikavkaz (Osetinskaya ASSR)", date: "1/31/14" },
  { id: 11, name: "Cody Fisher", email: "michelle.rivera@example.com", city: "Krasnodar", date: "5/19/12" },
  { id: 12, name: "Brooklyn Simmons", email: "georgia.young@example.com", city: "Rubtsovsk,", date: "7/18/17" },
  { id: 13, name: "Theresa Webb", email: "debbie.baker@example.com", city: "Herne", date: "8/15/13" },
  { id: 14, name: "Darrell Steward", email: "nathan.roberts@example.com", city: "Bochum", date: "10/6/13" },
  { id: 15, name: "Ronald Richards", email: "nevaeh.simmons@example.com", city: "Mönchengladbach", date: "9/18/16" },
  { id: 16, name: "Jerome Bell", email: "bill.sanders@example.com", city: "Baton Rouge (LA)", date: "1/15/12" },
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsersData.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectRow = (id: string | number) => {
    const numId = Number(id);
    if (selectedIds.includes(numId)) {
      setSelectedIds(selectedIds.filter((item) => item !== numId));
    } else {
      setSelectedIds([...selectedIds, numId]);
    }
  };

  const columns: Column<UserRow>[] = [
    {
      key: "name",
      header: "User Name",
      render: (user) => <span className={styles.userNameCell}>{user.name}</span>,
    },
    {
      key: "email",
      header: "Email Address",
      render: (user) => <span className={styles.emailCell}>{user.email}</span>,
    },
    {
      key: "city",
      header: "City",
      render: (user) => <span className={styles.cityCell}>{user.city}</span>,
    },
    {
      key: "date",
      header: "Account Created date",
      align: "right",
      render: (user) => <span className={styles.dateCell}>{user.date}</span>,
    },
  ];

  return (
    <div className={styles.userMgmtContainer}>
      {/* 3 Metric Cards */}
      <div className={styles.metricsGrid}>
        {/* Card 1: Active users */}
        <div className={styles.metricCard}>
          <div className={styles.cardTop}>
            <span className={styles.title}>Active users</span>
            <span className={styles.userIcon}>
              <Users size={18} />
            </span>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.numAndTrend}>
              <span className={styles.number}>1250</span>
              <span className={styles.subtext}>
                <span className={styles.red}>-10%</span> compared to last month
              </span>
            </div>
            <div className={styles.graphic}>
              <svg width="64" height="36" viewBox="0 0 64 36" fill="none">
                <path
                  d="M4 28 C 16 28, 24 16, 36 18 C 44 20, 52 8, 58 4"
                  stroke="#475569"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M50 4 H58 V12"
                  stroke="#475569"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: New Users */}
        <div className={styles.metricCard}>
          <div className={styles.cardTop}>
            <span className={styles.title}>New Users</span>
            <span className={styles.userIcon}>
              <Users size={18} />
            </span>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.numAndTrend}>
              <span className={styles.number}>24</span>
              <span className={styles.subtext}>
                <span className={styles.green}>+5%</span> compared to last month
              </span>
            </div>
            <div className={styles.graphic}>
              <svg width="50" height="38" viewBox="0 0 50 38" fill="none">
                <rect x="4" y="22" width="10" height="16" rx="2" fill="#94a3b8" />
                <rect x="20" y="12" width="10" height="26" rx="2" fill="#64748b" />
                <rect x="36" y="4" width="10" height="34" rx="2" fill="#334155" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Totall Users */}
        <div className={styles.metricCard}>
          <div className={styles.cardTop}>
            <span className={styles.title}>Totall Users</span>
            <span className={styles.userIcon}>
              <Users size={18} />
            </span>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.numAndTrend}>
              <span className={styles.number}>1301</span>
              <span className={styles.subtext}>
                <span className={styles.green}>+40%</span> compared to last month
              </span>
            </div>
            <div className={styles.graphic}>
              <svg width="54" height="32" viewBox="0 0 54 32" fill="none">
                <path
                  d="M5 28 A 22 22 0 0 1 49 28"
                  stroke="#cbd5e1"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M5 28 A 22 22 0 0 1 38 9"
                  stroke="#475569"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className={styles.tableCard}>
        {/* Action Header Bar */}
        <div className={styles.actionBar}>
          <div className={styles.titleGroup}>
            <span className={styles.tableTitle}>user list</span>
            <span className={styles.countBadge}>1240 user</span>
          </div>

          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <button className={styles.btn}>
              <ChevronDown size={16} /> Sorting By
            </button>
            <button className={styles.btn}>
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>

        {/* Global Data Table */}
        <Table
          data={filteredUsers}
          columns={columns}
          keyExtractor={(user) => user.id}
          selectable
          selectedKeys={selectedIds}
          onSelectAll={toggleSelectAll}
          onSelectRow={toggleSelectRow}
        />

        {/* Global Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Home;
