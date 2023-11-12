import { v4 as uuidv4 } from 'uuid'

export class EntityHelper {
    static GenerateUUID(): string {
        return uuidv4()
    }
}