import { registerEnumType } from '@nestjs/graphql'

export enum SeverityType {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

registerEnumType(SeverityType, {
  name: 'SeverityType',
  description: 'Severity level of a checklist item',
})
