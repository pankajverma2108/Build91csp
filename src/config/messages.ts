export const EMPTY_STATE_MESSAGES = {
  noProjects: {
    title: 'No Projects Found',
    description: 'You don\'t have any projects yet. Projects will appear here once they are created.',
  },
  noDocuments: {
    title: 'No Documents Found',
    description: 'There are no documents for this stage yet. Documents will appear here once they are uploaded.',
  },
  noComments: {
    title: 'No Comments Yet',
    description: 'No activity or comments for this stage. Check back later for updates.',
  },
  noStages: {
    title: 'No Stages Available',
    description: 'This project doesn\'t have any stages configured yet.',
  },
};

export const ERROR_MESSAGES = {
  loadProjectsFailed: 'Failed to load projects. Please try again.',
  loadProjectDetailFailed: 'Failed to load project details. Please try again.',
  loadDocumentsFailed: 'Failed to load documents. Please try again.',
  loadCommentsFailed: 'Failed to load comments. Please try again.',
  loginFailed: 'Login failed. Please check your credentials and try again.',
  networkError: 'Network error. Please check your connection and try again.',
  unknownError: 'An unexpected error occurred. Please try again.',
};

export const LOADING_MESSAGES = {
  loadingProjects: 'Loading projects...',
  loadingProjectDetail: 'Loading project details...',
  loadingDocuments: 'Loading documents...',
  loadingComments: 'Loading comments...',
  loggingIn: 'Logging in...',
};

export const SUCCESS_MESSAGES = {
  loginSuccess: 'Successfully logged in!',
  documentDownloaded: 'Document downloaded successfully.',
};
