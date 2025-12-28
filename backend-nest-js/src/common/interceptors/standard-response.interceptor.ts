import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StandardResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If already in StandardResponse format, return as is
        if (
          data &&
          typeof data === 'object' &&
          'code' in data &&
          'result' in data &&
          'detail' in data
        ) {
          return data;
        }
        return {
          code: 200,
          result: 'Sukses',
          detail: 'OK',
          data,
        };
      }),
    );
  }
}
