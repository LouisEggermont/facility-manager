import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { IssuesService } from './issues.service'
import { Issue } from './entities/issue.entity'
import { CreateIssueInput } from './dto/create-issue.input'

import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from '../authentication/guards/firebase.guard'
import { CurrentFirebaseUser } from 'src/decorators/user.decorator'
import { UserRecord } from 'firebase-admin/auth'

@Resolver(() => Issue)
export class IssuesResolver {
  issueRepository: any
  constructor(private readonly issuesService: IssuesService) {}

  // @Mutation(() => Issue)
  // createIssue(@Args('createIssueInput') createIssueInput: CreateIssueInput) {
  //   return this.issuesService.create(createIssueInput)
  // }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Issue)
  async createIssue(
    @Args('createIssueInput')
    createIssueInput: CreateIssueInput,
    @CurrentFirebaseUser() user: UserRecord,
  ) {
    try {
      // You can only create an issue for yourself
      // Maybe in the future we can override this for admins
      if (user.uid !== createIssueInput.userUid) {
        throw new Error(
          'User not authorized to create issue. You can only create issues for yourself.',
        )
      }

      const issue = await this.issuesService.create(
        createIssueInput,
        createIssueInput.userUid,
      )

      return issue
    } catch (err) {
      console.log(err)
      return err
    }
  }

  // @UseGuards(FirebaseGuard)
  // @Query(() => [Issue], { name: 'issues' })
  // findAll() {
  //   return this.issuesService.findAll()
  // }

  @UseGuards(FirebaseGuard)
  @Query(() => [Issue], { name: 'myissues' })
  findAllForCurrentUser(@CurrentFirebaseUser() user: UserRecord) {
    console.log('👀 Find all issues for user', user.uid)
    return this.issuesService.findAll(user.uid)
  }

  @Query(() => Issue, { name: 'issue' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.issuesService.findOne(id)
  }

  // @Mutation(() => Issue)
  // updateIssue(@Args('updateIssueInput') updateIssueInput: UpdateIssueInput) {
  //   return this.issuesService.update(updateIssueInput.id, updateIssueInput)
  // }

  @Mutation(() => Issue)
  removeIssue(@Args('id', { type: () => Int }) id: number) {
    return this.issuesService.remove(id)
  }
}
