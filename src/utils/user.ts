export interface UserInfo {
    username: string,
    displayName: string,
    roles: string[],
    avatar: string
}

export function login(username: string, password: string): boolean {
    let user = null
    if (username === 'admin') {
        user = {
            username: 'admin',
            displayName: 'Administrator',
            roles: ['admin'],
            avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }
    } else {
        user = {
            username: username,
            displayName: username,
            roles: ['user'],
            avatar: ''
        }
    }
    localStorage.setItem('userInfo', JSON.stringify(user))
    return true
}

export function clearUserinfo() {
    localStorage.removeItem('userInfo')
}

export function getCurrentUser(): UserInfo {
    let info = localStorage.getItem('userInfo');
    if (info == null) {
        return null
    } else {
        return JSON.parse(info)
    }

}
