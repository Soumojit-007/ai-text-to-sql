export interface HistoryItem{
    id: number,
    user_id: number | null,
    question: string,
    sql_query: string,
    result: string,
    created_at: string,
}