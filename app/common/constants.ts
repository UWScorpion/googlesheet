

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

export interface ManagerColumn {
    title?: string,
    texts?: string[],
}

export interface Comment {
    id?:string,
    commentType?: CommentType,
    comment?: string,
}

enum CommentType {
    QC,
    EDITOR,
}

enum QuestionType {
    SELECTOR,
    TEXTAREA,
}