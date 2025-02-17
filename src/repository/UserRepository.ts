import {User} from "../entity/User";

class UserRepository {

    /** 📋 Get all users */
    async getUsers(): Promise<User[]> {
        return User.query()
    }

    /** 🔍 Get user by ID */
    async getUserById(id: string): Promise<User | unknown> {
        return await User.query().findById(id).withGraphFetched('[wallet]')
    }

    /** 🔍 Search user */
    async searchUser(name: string): Promise<User[]> {
        return await User.query()
            .where('name', 'ILIKE', `%${name}%`) // 🔍 Пошук по імені, нечутливий до регістру
            .withGraphFetched('[wallet]'); // Завантажуємо всі залежності

    }

    /** 🔄 Update user */
    async updateUser(user: User): Promise<User> {
        return User.query().upsertGraph(user, {
            relate: true,  // Якщо зв’язок існує, оновлюємо, а не створюємо новий
            noDelete: true // Забороняє видалення існуючих записів
        })
    }

    /** 💾 Save user */
    async saveUser(user: User): Promise<User> {
        return await User.query().insertGraph(user.toJSON())
            .returning('*');
    }

    /** 🗑️ Delete user by ID */
    async deleteUserById(id: string): Promise<boolean> {
        return await User.query().deleteById(id) > 0;
    }
}

export const userRepository = new UserRepository();
