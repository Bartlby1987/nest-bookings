import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const resp = exception.getResponse();
            res.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: req.url,
                error: resp
            });
        } else {
            console.error('Unexpected error', exception);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: req.url,
                error: 'Internal server error'
            });
        }
    }
}
