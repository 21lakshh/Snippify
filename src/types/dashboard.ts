export enum DashboardTab {
  COMPONENTS = 'components',
  PRIVATE = 'private',
  PUBLIC = 'public',
  AI = 'ai'
}

export interface Tag {
  name: string
}

export interface Snippet {
  id: string
  title: string
  description: string
  code: string
  tags: Tag[]
  author?: {
    username: string
  }
  isPrivate?: boolean
}

export interface DashboardContentProps {
  activeTab: DashboardTab
  onCreateSnippet: () => void
} 