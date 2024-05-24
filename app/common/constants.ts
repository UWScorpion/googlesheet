

export interface PromptData {
    seedPrompt?: string,
    seedPromptInstructions?: string,
    seedPromptAnalysis?:string,
}

export interface Column {
    id?: string,
    type?: QuestionType,
    title?: string,
    text?: string,
    columnNum?: string,
    disabled?: boolean,
    comments?: Comment[],
}

export interface ProjectCoordinatorColumn {
    title?: string,
    texts?: string[],
}

export interface Comment {
    id?:string,
    commentType?: CommentType,
    comment?: string,
}

export enum CommentType {
    QC = "Quality Control",
    EDITOR="Editor",
}

enum QuestionType {
    SELECTOR,
    TEXTAREA,
}

export interface ProjectCoordinator {
    id?: string,
    range?: string,
    name?: string, 
    email?: string,
}

export const projectCoordinators = ["abc@gmail.com", "def@google.com", "ghi@google.com"];

export const scoreList = [0, 1, 2, 3, 4, 5];