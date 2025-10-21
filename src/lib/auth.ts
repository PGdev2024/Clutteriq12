import { supabase } from "@/integrations/supabase/client";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdat: string;
  updatedat: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return { user: null, error: "User already exists" };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert new user
    const { data, error } = await supabase
      .from("users")
      .insert({
        email,
        name,
        password: hashedPassword,
      })
      .select()
      .single();

    if (error) {
      return { user: null, error: error.message };
    }

    // Store user session
    if (data) {
      localStorage.setItem("userId", data.id);
      return { user: data, error: null };
    }

    return { user: null, error: "Failed to create user" };
  } catch (error) {
    return { user: null, error: "An error occurred during signup" };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Get user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return { user: null, error: "Invalid email or password" };
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return { user: null, error: "Invalid email or password" };
    }

    // Store user session
    localStorage.setItem("userId", user.id);

    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, error: null };
  } catch (error) {
    return { user: null, error: "An error occurred during signin" };
  }
};

export const signOut = (): void => {
  localStorage.removeItem("userId");
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, email, name, createdat, updatedat")
      .eq("id", userId)
      .single();

    if (error || !data) return null;

    return data;
  } catch (error) {
    return null;
  }
};
