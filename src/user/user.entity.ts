import { Column, Entity, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'user_name',
        type: 'bigint',
        nullable: false
    })
    name: number

    @Column({
        name: 'phone',
        type: 'character varying',
        nullable: false
    })
    phone: string

    @Column({
        name: 'password',
        type: 'character varying',
        default: '123456',
        nullable: false
    })
    password: string

    @Column({
        name: 'avatar_url',
        type: 'character varying',
        default: 'default_avatarUrl',
        nullable: false
    })
    avatarUrl: string

    @Column({
        name: 'nick_name',
        type: 'character varying',
        default: '普通用户',
        nullable: false
    })
    nickName: string

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date()
    }
}
