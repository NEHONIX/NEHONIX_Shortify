export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bundle_links: {
        Row: {
          bundle_id: string;
          created_at: string;
          link_id: string;
        };
        Insert: {
          bundle_id: string;
          created_at?: string;
          link_id: string;
        };
        Update: {
          bundle_id?: string;
          created_at?: string;
          link_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bundle_links_bundle_id_fkey";
            columns: ["bundle_id"];
            isOneToOne: false;
            referencedRelation: "link_bundles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bundle_links_link_id_fkey";
            columns: ["link_id"];
            isOneToOne: false;
            referencedRelation: "shortened_links";
            referencedColumns: ["id"];
          }
        ];
      };
      link_analytics: {
        Row: {
          city: string | null;
          country: string | null;
          created_at: string;
          device_type: string | null;
          id: string;
          ip_address: string | null;
          link_id: string | null;
          referer: string | null;
          user_agent: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          created_at?: string;
          device_type?: string | null;
          id?: string;
          ip_address?: string | null;
          link_id?: string | null;
          referer?: string | null;
          user_agent?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          created_at?: string;
          device_type?: string | null;
          id?: string;
          ip_address?: string | null;
          link_id?: string | null;
          referer?: string | null;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "link_analytics_link_id_fkey";
            columns: ["link_id"];
            isOneToOne: false;
            referencedRelation: "shortened_links";
            referencedColumns: ["id"];
          }
        ];
      };
      link_bundles: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "link_bundles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          full_name: string | null;
          id: string;
          subscription_end_date: string | null;
          subscription_type: "premium" | "free";
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          full_name?: string | null;
          id: string;
          subscription_end_date?: string | null;
          subscription_type?: "premium" | "free";
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          full_name?: string | null;
          id?: string;
          subscription_end_date?: string | null;
          subscription_type?: "premium" | "free";
          updated_at?: string;
        };
        Relationships: [];
      };
      shortened_links: {
        Row: {
          click_limit: number | null;
          created_at: string;
          custom_domain: string | null;
          expiry_date: string | null;
          id: string;
          is_premium: boolean | null;
          original_url: string;
          password: string | null;
          short_code: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          click_limit?: number | null;
          created_at?: string;
          custom_domain?: string | null;
          expiry_date?: string | null;
          id?: string;
          is_premium?: boolean | null;
          original_url: string;
          password?: string | null;
          short_code: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          click_limit?: number | null;
          created_at?: string;
          custom_domain?: string | null;
          expiry_date?: string | null;
          id?: string;
          is_premium?: boolean | null;
          original_url?: string;
          password?: string | null;
          short_code?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "shortened_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      students: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string | null;
          id: string;
          level: string | null;
          name: string | null;
          specialization: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          id: string;
          level?: string | null;
          name?: string | null;
          specialization?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          level?: string | null;
          name?: string | null;
          specialization?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export interface CreateShortenData {
  original_url: string;
  user_id: string;
  password: string;
  is_premium: boolean;
}
