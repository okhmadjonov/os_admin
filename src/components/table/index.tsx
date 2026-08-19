import React from "react";
import styles from "./Table.module.scss";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  selectable?: boolean;
  selectedKeys?: (string | number)[];
  onSelectAll?: () => void;
  onSelectRow?: (key: string | number) => void;
  className?: string;
  emptyText?: string;
}

export function Table<T>({
  data,
  columns,
  keyExtractor,
  selectable = false,
  selectedKeys = [],
  onSelectAll,
  onSelectRow,
  className = "",
  emptyText = "Ma'lumot topilmadi",
}: TableProps<T>): React.ReactElement {
  const isAllSelected =
    data.length > 0 && selectedKeys.length === data.length;

  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table>
        <thead>
          <tr>
            {selectable && (
              <th className={styles.checkboxTh}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ textAlign: col.align || "left", ...col.style }}
                className={col.className || ""}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={styles.emptyRow}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const rowKey = keyExtractor(item);
              const isSelected = selectedKeys.includes(rowKey);

              return (
                <tr key={rowKey}>
                  {selectable && (
                    <td className={styles.checkboxTd}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow && onSelectRow(rowKey)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{ textAlign: col.align || "left", ...col.style }}
                      className={col.className || ""}
                    >
                      {col.render
                        ? col.render(item, index)
                        : (item as Record<string, unknown>)[col.key] != null
                        ? String((item as Record<string, unknown>)[col.key])
                        : ""}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
