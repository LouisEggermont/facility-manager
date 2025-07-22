import { Injectable } from '@nestjs/common'
import { CreateIssueInput } from './dto/create-issue.input'
// import { UpdateIssueInput } from './dto/update-issue.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Issue } from './entities/issue.entity'
import { MongoRepository, ObjectId } from 'typeorm'

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: MongoRepository<Issue>,
    // private readonly issueRepository: Repository<Issue>,
  ) {}

  // create(createIssueInput: CreateIssueInput) {
  //   return 'This action adds a new issue';
  // }

  async create(
    createIssueInput: CreateIssueInput,
    userUid: string,
  ): Promise<Issue> {
    try {
      // create issue
      const o = new Issue()
      o.userUid = userUid
      o.title = createIssueInput.title
      o.description = createIssueInput.description

      // save issue
      const newIssue = await this.issueRepository.save(o)

      return newIssue
    } catch (err) {
      throw err
    }
  }

  // findAll() {
  //   return `This action returns all issues`
  // }

  findAll(uid?: string) {
    // If uid is provided, return only issues for that user
    if (uid) {
      return this.issueRepository.find({ where: { userUid: uid } })
    }
    return this.issueRepository.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} issue`
  // }

  findOne(id: string) {
    console.log('findOne', id)
    const objID = new ObjectId(id)
    return this.issueRepository.findOneByOrFail({ _id: objID })
  }

  // update(id: number, updateIssueInput: UpdateIssueInput) {
  //   return `This action updates a #${id} issue`
  // }

  remove(id: number) {
    return `This action removes a #${id} issue`
  }
}
