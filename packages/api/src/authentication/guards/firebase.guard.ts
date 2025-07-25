import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context)
    const gqlContext = ctx.getContext<{ req: Request }>()
    return gqlContext.req
  }
}
