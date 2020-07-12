export default class Gate {

    constructor(user) {
        this.user = user;
        console.log('gate',this.user)
    }

    isAdmin() {
        return this.user.type === 'admin';
    }

    isUser() {
        return this.user.type === 'user';
    }
}

