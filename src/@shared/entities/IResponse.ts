import joi from 'joi';
export type IResponse<TResult = any, TError = any> = {
    success: boolean;
    data?: TResult;
    error?: TError;
    code?: any;
    message: any;
}

export const IResponseSchema = joi.object<IResponse>({
    success: joi.required()
}) 