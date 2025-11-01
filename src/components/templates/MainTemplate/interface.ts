import { GitHubUser } from "@/utils/interfaces/interfaces";

export interface MainTemplateProps {
  user: GitHubUser | null;
  handleLogout: () => void;
  children: React.ReactNode;
}
