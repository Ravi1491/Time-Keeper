export class UserCreatedEvent{
  
  constructor(public readonly firstName: string , public readonly email : string){}
}