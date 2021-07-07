import router from '../router'

export interface UserInfo {
    username: string,
    displayName: string,
    roles: string[],
    avatar: string
}

export function login(username: string, password: string): boolean {
    if (username === 'admin') {
        let info: UserInfo = {
            username: 'admin',
            displayName: 'Administrator',
            roles: ['admin'],
            avatar: ''
        }
        localStorage.setItem('userInfo', JSON.stringify(info))
        return true
    } else {
        return false
    }
}

export function logout() {
    localStorage.removeItem('userInfo')
    router.push('/')
}

export function getCurrentUser(): UserInfo {
    let info = localStorage.getItem('userInfo');
    if (info == null) {
        router.push('/login')
        return null
    } else {
        return JSON.parse(info)
    }

}