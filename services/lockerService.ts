import { turso } from "@/lib/tursoClient";

export const fetchLockerById = async (id: string) => {
  try {
    const response = await turso.execute({
      sql: "SELECT * FROM users WHERE id = ?",
      args: [1],
    });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch locker");
  }
};
