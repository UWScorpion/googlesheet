

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
    disabled?: boolean,
    comments?: Comment[],
}

export interface Comment {
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