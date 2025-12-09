export interface ContentState {
  [key: string]: string;
}

export interface AdminContextType {
  isAdmin: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  content: ContentState;
  updateContent: (key: string, value: string) => void;
  saveChanges: () => void;
  discardChanges: () => void;
  hasUnsavedChanges: boolean;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (v: boolean) => void;
}

export interface EditableProps {
  id: string;
  defaultContent: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}
