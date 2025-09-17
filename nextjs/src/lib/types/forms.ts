export interface BaseFormProps {
  type: "create" | "update";
  data?: any;
  onSuccess?: () => void;
}